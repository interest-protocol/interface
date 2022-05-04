import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useCallback, useMemo, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

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
import { useGetUserDineroMarketData } from '@/hooks';
import { CHAIN_ID, DINERO_MARKET_CONTRACT_MAP } from '@/sdk/constants';
import { IntMath } from '@/sdk/entities/int-math';
import { getAccount, getChainId } from '@/state/core/core.selectors';
import {
  getBTCAddress,
  getDNRAddress,
  showTXSuccessToast,
  throwError,
  throwIfInvalidAccountAndChainId,
} from '@/utils';
import {
  calculatePositionHealth,
  getLoanInfoData,
  getMyPositionData,
  loanElasticToPrincipal,
  processDineroMarketUserData,
} from '@/utils/dinero-market';
import { throwContractCallError } from '@/utils/error';

import GoBack from '../../components/go-back';
import ErrorPage from '../error';
import { borrowFormValidation } from './components/borrow-form/borrow-form.validator';
import LoanInfo from './components/loan-info';
import MyOpenPosition from './components/my-open-position';
import UserLTV from './components/user-ltv';
import YourBalance from './components/your-balance';
import { BORROW_DEFAULT_VALUES } from './dinero-market.data';
import { DineroMarketProps, IBorrowForm } from './dinero-market.types';
import DineroMarketForm from './dinero-market-form';
import DineroMarketSwitch from './dinero-market-switch';

const isFormBorrowEmpty = (form: UseFormReturn<IBorrowForm, any>) =>
  form.formState.errors.borrow ||
  form.formState.errors.borrow?.['loan'] ||
  form.formState.errors.borrow?.['collateral'];

const isFormRepayEmpty = (form: UseFormReturn<IBorrowForm, any>) =>
  form.formState.errors.repay ||
  form.formState.errors.repay?.['loan'] ||
  form.formState.errors.repay?.['collateral'];

const DineroMarket: FC<DineroMarketProps> = ({ tokenSymbol, mode }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<IBorrowForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: BORROW_DEFAULT_VALUES,
    resolver: yupResolver(borrowFormValidation),
  });

  const chainId = useSelector(getChainId) as number | null;
  const account = useSelector(getAccount) as string;

  const handleAddAllowance = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const validId = throwIfInvalidAccountAndChainId([account], chainId);

      const tx = await addAllowance(
        validId,
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
  }, [account, chainId, tokenSymbol]);

  const submitAllowance = () =>
    toast.promise(handleAddAllowance(), {
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

      const validId = throwIfInvalidAccountAndChainId([account], chainId);

      const estimatedPrincipal = loanElasticToPrincipal(
        data.market.totalLoan,
        IntMath.toBigNumber(loan),
        data.market.loan
      );

      const principal = estimatedPrincipal.gte(data.market.userLoan)
        ? data.market.userLoan
        : estimatedPrincipal.value();

      if (!!collateral && !!loan) {
        const tx = await repayAndWithdrawCollateral(
          validId,
          tokenSymbol,
          account,
          IntMath.toBigNumber(collateral),
          principal
        );

        await showTXSuccessToast(tx);

        return;
      }

      if (collateral) {
        const tx = await withdrawDineroCollateral(
          validId,
          tokenSymbol,
          account,
          IntMath.toBigNumber(collateral)
        );

        await showTXSuccessToast(tx);
        return;
      }

      if (loan) {
        const tx = await repayDineroLoan(
          validId,
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
  }, [chainId, account, form.getValues(), tokenSymbol]);

  const handleBorrow = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const collateral = +form.getValues('borrow').collateral;
      const loan = +form.getValues('borrow').loan;

      if ((!collateral || isNaN(+collateral)) && (!loan || isNaN(+loan)))
        throwError('Form: Invalid Fields');

      const validId = throwIfInvalidAccountAndChainId([account], chainId);

      if (!!collateral && !!loan) {
        const tx = await addCollateralAndLoan(
          validId,
          tokenSymbol,
          account,
          IntMath.toBigNumber(collateral),
          IntMath.toBigNumber(loan)
        );

        await showTXSuccessToast(tx);

        return;
      }

      if (collateral) {
        const tx = await addDineroMarketCollateral(
          validId,
          tokenSymbol,
          account,
          IntMath.toBigNumber(collateral)
        );

        await showTXSuccessToast(tx);
        return;
      }

      if (loan) {
        const tx = await getDineroMarketLoan(
          validId,
          tokenSymbol,
          account,
          IntMath.toBigNumber(loan)
        );

        await showTXSuccessToast(tx);
      }
    } catch (e: unknown) {
      throwContractCallError(e);
    } finally {
      setIsSubmitting(false);
      await mutate();
    }
  }, [account, chainId, form.getValues(), tokenSymbol]);

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

    await toast.promise(handleBorrow(), {
      loading: 'Loading...',
      success: 'Success!',
      error: (error) => error.message,
    });
  };

  const onSubmitRepay = async () => {
    if (isFormRepayEmpty(form)) {
      toast.error('Borrow or collateral amount are wrong');
      return;
    }

    if (
      !chainId ||
      !tokenSymbol ||
      !account ||
      !data ||
      data?.dineroPair.getDineroAllowance().isZero()
    )
      return;

    await toast.promise(handleRepay(), {
      loading: 'Loading...',
      success: 'Success!',
      error: (error) => error.message,
    });
  };

  if (error) return <ErrorPage message="Something went wrong" />;

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
    </Container>
  );
};

export default DineroMarket;
