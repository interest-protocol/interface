import { yupResolver } from '@hookform/resolvers/yup';
import { ethers } from 'ethers';
import { pathOr } from 'ramda';
import { FC, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import { addAllowance } from '@/api';
import { Container, Tooltip } from '@/components';
import { getDineroMarketSVGBySymbol } from '@/constants';
import {
  DINERO_MARKET_METADATA,
  DineroMarketKind,
  RoutesEnum,
} from '@/constants';
import { Box } from '@/elements';
import { useGetDineroMarketDataV2, useGetSigner } from '@/hooks';
import { useIdAccount } from '@/hooks/use-id-account';
import { coreActions } from '@/state/core/core.actions';
import {
  showToast,
  showTXSuccessToast,
  throwContractCallError,
  throwError,
  throwIfInvalidSigner,
} from '@/utils';

import GoBack from '../../components/go-back';
import ErrorPage from '../error';
import { borrowFormValidation } from './components/borrow-form/borrow-form.validator';
import LoanInfo from './components/loan-info';
import MyOpenPosition from './components/my-open-position';
import UserLTV from './components/user-ltv';
import YourBalance from './components/your-balance';
import * as api from './dinero-market.api';
import { BORROW_DEFAULT_VALUES } from './dinero-market.data';
import { DineroMarketPanelProps, IBorrowForm } from './dinero-market.types';
import {
  calculatePositionHealth,
  getLoanInfoData,
  getMyPositionData,
  getSafeDineroMarketData,
  isFormBorrowEmpty,
  isFormRepayEmpty,
  loanPrincipalToElastic,
} from './dinero-market.utils';
import DineroMarketForm from './dinero-market-form';
import DineroMarketSwitch from './dinero-market-switch';

const DineroMarketPanel: FC<DineroMarketPanelProps> = ({ address, mode }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signer } = useGetSigner();
  const { chainId, account } = useIdAccount();

  const {
    data: marketRawData,
    error,
    mutate,
  } = useGetDineroMarketDataV2(address);

  const kind = pathOr(
    DineroMarketKind.ERC20,
    [
      chainId ? chainId.toString() : 0,
      ethers.utils.getAddress(address),
      'kind',
    ],
    DINERO_MARKET_METADATA
  );

  const market = useMemo(
    () => getSafeDineroMarketData(chainId, address, marketRawData),
    [marketRawData, address, chainId]
  );

  const dispatch = useDispatch();

  const form = useForm<IBorrowForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: BORROW_DEFAULT_VALUES,
    resolver: yupResolver(borrowFormValidation),
  });

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
        market.collateralAddress,
        market.marketAddress
      );

      await showTXSuccessToast(tx, validId);
    } catch (e) {
      throwError('Something went wrong', e);
    } finally {
      setIsSubmitting(false);
      dispatch(coreActions.updateNativeBalance());
    }
  }, [
    account,
    chainId,
    market.marketAddress,
    market.collateralAddress,
    signer,
  ]);

  const submitAllowance = () =>
    showToast(handleAddAllowance(), {
      loading: 'Allowing...',
      success: 'Success!',
      error: ({ message }) => message,
    });

  const loanInfoData = useMemo(
    () => getLoanInfoData(market, kind),
    [market, kind]
  );

  const myPositionData = useMemo(() => getMyPositionData(market), [market]);

  const currentLTV = useMemo(
    () =>
      100 -
      calculatePositionHealth(
        market,
        loanPrincipalToElastic({
          loanBase: market.loanBase,
          loanElastic: market.loanElastic,
          userPrincipal: market.userPrincipal,
          lastAccrued: market.lastAccrued,
          interestRate: market.interestRate,
        }).value()
      ).toNumber(16, 0, 4),
    [market]
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

      await api.handleRepay(
        validId,
        validSigner,
        market,
        account,
        collateral,
        loan
      );
      form.reset();
    } catch (e: unknown) {
      throwContractCallError(e);
    } finally {
      setIsSubmitting(false);
      await mutate();
      dispatch(coreActions.updateNativeBalance());
    }
  }, [chainId, account, form.getValues(), signer, market]);

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

      await api.handleBorrow(
        validId,
        validSigner,
        market,
        account,
        collateral,
        loan
      );
      form.reset();
    } catch (e: unknown) {
      throwContractCallError(e);
    } finally {
      setIsSubmitting(false);
      await mutate();
      dispatch(coreActions.updateNativeBalance());
    }
  }, [account, chainId, form.getValues(), signer, market]);

  const onSubmitBorrow = async () => {
    if (isFormBorrowEmpty(form)) {
      toast.error('Borrow or collateral amount are wrong');
      return;
    }
    if (!chainId || !account || !market || market.collateralAllowance.isZero())
      return;

    await showToast(handleBorrow());
  };

  const onSubmitRepay = async () => {
    if (isFormRepayEmpty(form)) {
      toast.error('Borrow or collateral amount are wrong');
      return;
    }

    if (!chainId || !account || !market) return;

    await showToast(handleRepay());
  };

  if (error) return <ErrorPage message="Something went wrong" />;

  return (
    <Container
      dapp
      my="XL"
      width="100%"
      display="flex"
      position="relative"
      flexDirection="column"
    >
      <Box
        textAlign={['center', 'center', 'center', 'left']}
        left={['unset', 'unset', '-5rem', 'unset', '-5rem']}
        position={['static', 'static', 'absolute', 'static', 'absolute']}
      >
        <GoBack route={RoutesEnum.DineroMarket} />
      </Box>
      <Box>
        <Box bg="foreground" textAlign="center" p="L" borderRadius="L">
          <DineroMarketSwitch
            mode={mode}
            address={address}
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
            mode={mode}
            form={form}
            data={market}
            account={account}
            isSubmitting={isSubmitting}
            onSubmitRepay={onSubmitRepay}
            onSubmitBorrow={onSubmitBorrow}
            handleAddAllowance={submitAllowance}
            isGettingData={market.collateralUSDPrice.isZero() && !error}
          />
          <UserLTV
            isLoading={market.collateralUSDPrice.isZero() && !error}
            ltv={currentLTV}
          />
          <LoanInfo
            kind={market.kind}
            loanInfoData={loanInfoData}
            isLoading={market.collateralUSDPrice.isZero() && !error}
          />
          <MyOpenPosition
            myPositionData={myPositionData}
            symbols={[market.symbol0, market.symbol1]}
            collateralUSDPrice={market.collateralUSDPrice}
            isLoading={market.collateralUSDPrice.isZero() && !error}
          />
          <YourBalance
            collateralName={market.name}
            dnrBalance={market.dnrBalance}
            intBalance={market.rewardsBalance}
            collateralBalance={market.collateralBalance}
            collateralDecimals={market.collateralDecimals}
            isPair={market.kind === DineroMarketKind.LpFreeMarket}
            currencyIcons={getDineroMarketSVGBySymbol(
              market.symbol0,
              market.symbol1
            )}
            loading={market.collateralUSDPrice.isZero() && !error}
          />
        </Box>
      </Box>
      <Tooltip />
    </Container>
  );
};

export default DineroMarketPanel;
