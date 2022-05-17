import { yupResolver } from '@hookform/resolvers/yup';
import dynamic from 'next/dynamic';
import { FC, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  addAllowance,
  addCollateralAndLoan,
  addDineroMarketCollateral,
  getDineroMarketLoan,
  repayAndWithdrawCollateral,
  repayDineroLoan,
  withdrawDineroCollateral,
} from '@/api';
import { Container } from '@/components';
import { ERC_20_DATA } from '@/constants';
import { Box } from '@/elements';
import {
  useGetSigner,
  useGetUserDineroMarketData,
  useIsMounted,
} from '@/hooks';
import { CHAIN_ID, DINERO_MARKET_CONTRACT_MAP } from '@/sdk';
import {
  getBTCAddress,
  getDNRAddress,
  safeToBigNumber,
  showToast,
  showTXSuccessToast,
  throwContractCallError,
  throwError,
  throwIfInvalidSigner,
} from '@/utils';
import {
  calculatePositionHealth,
  getLoanInfoData,
  getMyPositionData,
  loanElasticToPrincipal,
  processDineroMarketUserData,
} from '@/utils/dinero-market';

import GoBack from '../../components/go-back';
import ErrorPage from '../error';
import { borrowFormValidation } from './components/borrow-form/borrow-form.validator';
import LoanInfo from './components/loan-info';
import MyOpenPosition from './components/my-open-position';
import UserLTV from './components/user-ltv';
import YourBalance from './components/your-balance';
import { BORROW_DEFAULT_VALUES } from './dinero-market.data';
import { DineroMarketProps, IBorrowForm } from './dinero-market.types';
import { isFormBorrowEmpty, isFormRepayEmpty } from './dinero-market.utils';
import DineroMarketForm from './dinero-market-form';
import DineroMarketSwitch from './dinero-market-switch';

const DineroMarket: FC<DineroMarketProps> = ({ tokenSymbol, mode }) => {
  const isMounted = useIsMounted();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<IBorrowForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: BORROW_DEFAULT_VALUES,
    resolver: yupResolver(borrowFormValidation),
  });

  const { signer, account, chainId } = useGetSigner();

  const handleAddAllowance = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const { validId, validSigner } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      const tx = await addAllowance(
        validId,
        validSigner,
        account,
        ERC_20_DATA[validId][tokenSymbol].address,
        DINERO_MARKET_CONTRACT_MAP[validId][tokenSymbol]
      );

      await showTXSuccessToast(tx);
    } catch (e) {
      throwError('Something went wrong', e);
    } finally {
      setIsSubmitting(false);
    }
  }, [account, chainId, tokenSymbol, signer]);

  const submitAllowance = () =>
    showToast(handleAddAllowance(), {
      loading: 'Allowing...',
      success: 'Success!',
      error: ({ message }) => message,
    });

  const {
    data: rawData,
    mutate,
    error,
  } = useGetUserDineroMarketData(
    DINERO_MARKET_CONTRACT_MAP[CHAIN_ID.BSC_TEST_NET][tokenSymbol],
    [getBTCAddress(CHAIN_ID.BSC_TEST_NET), getDNRAddress(CHAIN_ID.BSC_TEST_NET)]
  );

  const data = useMemo(
    () =>
      processDineroMarketUserData(
        chainId,
        [
          getBTCAddress(CHAIN_ID.BSC_TEST_NET),
          getDNRAddress(CHAIN_ID.BSC_TEST_NET),
        ],
        rawData
      ),
    [rawData, chainId]
  );

  const loanInfoData = useMemo(() => getLoanInfoData(data), [data]);

  const myPositionData = useMemo(() => getMyPositionData(data), [data]);

  const currentLTV = useMemo(
    () => calculatePositionHealth(data.market).toNumber(16, 0, 4),
    [data.market]
  );

  const handleRepay = useCallback(async () => {
    try {
      setIsSubmitting(true);
      const collateral = +form.getValues('repay').collateral;
      const loan = +form.getValues('repay').loan;

      if ((!collateral || isNaN(+collateral)) && (!loan || isNaN(+loan)))
        throwError('Form: Invalid Fields');

      const { validId, validSigner } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      const estimatedPrincipal = loanElasticToPrincipal(
        data.market.totalLoan,
        safeToBigNumber(loan),
        data.market.loan
      );

      const principal = estimatedPrincipal.gte(data.market.userLoan)
        ? data.market.userLoan
        : estimatedPrincipal.value();

      if (!!collateral && !!loan) {
        const bnCollateral = safeToBigNumber(
          collateral,
          data.dineroPair.getCollateral().decimals,
          8
        );
        const tx = await repayAndWithdrawCollateral(
          validId,
          validSigner,
          tokenSymbol,
          account,
          bnCollateral.gt(data.market.userCollateral)
            ? data.market.userCollateral
            : bnCollateral,
          bnCollateral.gte(data.market.userCollateral)
            ? data.market.userLoan
            : principal
        );

        await showTXSuccessToast(tx);

        return;
      }

      if (collateral) {
        const bnCollateral = safeToBigNumber(
          collateral,
          data.dineroPair.getCollateral().decimals,
          8
        );
        const tx = await withdrawDineroCollateral(
          validId,
          validSigner,
          tokenSymbol,
          account,
          bnCollateral.gt(data.market.userCollateral)
            ? data.market.userCollateral
            : bnCollateral
        );

        await showTXSuccessToast(tx);
        return;
      }

      if (loan) {
        const tx = await repayDineroLoan(
          validId,
          validSigner,
          tokenSymbol,
          account,
          principal
        );

        await showTXSuccessToast(tx);
      }
    } catch (e: unknown) {
      throwContractCallError(e);
    } finally {
      setIsSubmitting(false);
      await mutate();
    }
  }, [
    chainId,
    account,
    form.getValues(),
    tokenSymbol,
    signer,
    data.market.userCollateral.toString(),
  ]);

  const handleBorrow = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const collateral = +form.getValues('borrow').collateral;
      const loan = +form.getValues('borrow').loan;

      if ((!collateral || isNaN(+collateral)) && (!loan || isNaN(+loan)))
        throwError('Form: Invalid Fields');

      const { validId, validSigner } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      const currentCollateralBalance = data.dineroPair.getCollateralBalance();

      if (!!collateral && !!loan) {
        const bnCollateral = safeToBigNumber(
          collateral,
          data.dineroPair.getCollateral().decimals,
          8
        );
        const tx = await addCollateralAndLoan(
          validId,
          validSigner,
          tokenSymbol,
          account,
          bnCollateral.gt(currentCollateralBalance)
            ? currentCollateralBalance
            : bnCollateral,
          safeToBigNumber(loan)
        );

        await showTXSuccessToast(tx);

        return;
      }

      if (collateral) {
        const bnCollateral = safeToBigNumber(
          collateral,
          data.dineroPair.getCollateral().decimals,
          8
        );
        const tx = await addDineroMarketCollateral(
          validId,
          validSigner,
          tokenSymbol,
          account,
          bnCollateral.gt(currentCollateralBalance)
            ? currentCollateralBalance
            : bnCollateral
        );

        await showTXSuccessToast(tx);
        return;
      }

      if (loan) {
        const tx = await getDineroMarketLoan(
          validId,
          validSigner,
          tokenSymbol,
          account,
          safeToBigNumber(loan)
        );

        await showTXSuccessToast(tx);
      }
    } catch (e: unknown) {
      throwContractCallError(e);
    } finally {
      setIsSubmitting(false);
      await mutate();
    }
  }, [
    account,
    chainId,
    form.getValues(),
    tokenSymbol,
    signer,
    data.dineroPair.getCollateralBalance().toString(),
  ]);

  const onSubmitBorrow = async () => {
    if (isFormBorrowEmpty(form)) {
      toast.error('Borrow or collateral amount are wrong');
      return;
    }
    if (
      !chainId ||
      !tokenSymbol ||
      !account ||
      !data ||
      data?.dineroPair.getCollateralAllowance().isZero()
    )
      return;

    await showToast(handleBorrow());
  };

  const onSubmitRepay = async () => {
    if (isFormRepayEmpty(form)) {
      toast.error('Borrow or collateral amount are wrong');
      return;
    }

    if (!chainId || !tokenSymbol || !account || !data) return;

    await showToast(handleRepay());
  };

  if (error) return <ErrorPage message="Something went wrong" />;

  const Tooltip = dynamic(() => import('react-tooltip'));

  return (
    <Container
      dapp
      my="XL"
      display="flex"
      position="relative"
      flexDirection="column"
    >
      <Box
        textAlign={['center', 'center', 'center', 'left']}
        left={['unset', 'unset', '-5rem', 'unset', '-5rem']}
        position={['static', 'static', 'absolute', 'static', 'absolute']}
      >
        <GoBack />
      </Box>
      <Box>
        <Box bg="foreground" textAlign="center" p="L" borderRadius="L">
          <DineroMarketSwitch
            tokenSymbol={tokenSymbol}
            mode={mode}
            resetField={form.resetField}
          />
        </Box>
        <Box
          my="L"
          rowGap="0.7rem"
          columnGap="0.7rem"
          gridTemplateColumns="1fr 1fr"
          display={['flex', 'flex', 'flex', 'grid']}
          alignItems={['stretch', 'stretch', 'stretch', 'start']}
          flexDirection={['column', 'column', 'column', 'unset']}
          gridTemplateAreas="'a b''a b''a c''a d''a d''a d''e d''e d''e d''f d'"
        >
          <DineroMarketForm
            data={data}
            mode={mode}
            form={form}
            isSubmitting={isSubmitting}
            isGettingData={data.market.exchangeRate.isZero() && !error}
            onSubmitRepay={onSubmitRepay}
            onSubmitBorrow={onSubmitBorrow}
            handleAddAllowance={submitAllowance}
          />
          <UserLTV
            isLoading={data.market.exchangeRate.isZero() && !error}
            ltv={currentLTV}
          />
          <LoanInfo
            loanInfoData={loanInfoData}
            isLoading={data.market.exchangeRate.isZero() && !error}
          />
          <MyOpenPosition
            isLoading={data.market.exchangeRate.isZero() && !error}
            myPositionData={myPositionData}
            exchangeRate={data.market.exchangeRate}
          />
          <YourBalance
            loading={data.market.exchangeRate.isZero() && !error}
            dineroPair={data.dineroPair}
          />
        </Box>
      </Box>

      {isMounted.current && (
        <Tooltip place="top" type="dark" effect="solid" multiline />
      )}
    </Container>
  );
};

export default DineroMarket;
