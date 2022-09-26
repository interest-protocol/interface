import { yupResolver } from '@hookform/resolvers/yup';
import { ethers } from 'ethers';
import { useTranslations } from 'next-intl';
import { pathOr, prop } from 'ramda';
import { FC, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Container, Tooltip } from '@/components';
import { getDineroMarketSVGByAddress } from '@/constants';
import {
  DINERO_MARKET_METADATA,
  DineroMarketKind,
  RoutesEnum,
} from '@/constants';
import { Box } from '@/elements';
import { useApprove } from '@/hooks';
import { useGetDineroMarketDataV2 } from '@/hooks';
import { useIdAccount } from '@/hooks/use-id-account';
import {
  capitalize,
  showToast,
  showTXSuccessToast,
  throwContractCallError,
  throwError,
} from '@/utils';

import GoBack from '../../components/go-back';
import ErrorPage from '../error';
import { borrowFormValidation } from './components/borrow-form/borrow-form.validator';
import LoanInfo from './components/loan-info';
import MyOpenPosition from './components/my-open-position';
import UserLTV from './components/user-ltv';
import YourBalance from './components/your-balance';
import { BORROW_DEFAULT_VALUES } from './dinero-market.data';
import { useBorrow, useRepay } from './dinero-market.hooks';
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
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { chainId, account } = useIdAccount();

  const {
    data: marketRawData,
    error,
    refetch,
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

  const { writeAsync: approve } = useApprove(
    market.collateralAddress,
    market.marketAddress,
    {
      enabled: market.collateralAllowance.isZero(),
    }
  );

  const form = useForm<IBorrowForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: BORROW_DEFAULT_VALUES,
    resolver: yupResolver(borrowFormValidation),
  });

  const { writeAsync: borrow } = useBorrow(market, account, form.control);
  const { writeAsync: repay } = useRepay(market, account, form.control);

  const handleAddAllowance = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const tx = await approve?.();
      await showTXSuccessToast(tx, chainId);
    } catch (e) {
      throwError(t('error.generic'), e);
    } finally {
      setIsSubmitting(false);
    }
  }, [approve, chainId]);

  const submitAllowance = () =>
    showToast(handleAddAllowance(), {
      loading: capitalize(`${t('common.approve', { isLoading: 1 })}`),
      success: capitalize(t('common.success')),
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
      const tx = await repay?.();

      await showTXSuccessToast(tx, chainId);
      form.reset();
    } catch (e: unknown) {
      throwContractCallError(e);
    } finally {
      setIsSubmitting(false);
      await refetch();
    }
  }, [chainId, repay]);

  const handleBorrow = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const tx = await borrow?.();

      await showTXSuccessToast(tx, chainId);
      form.reset();
    } catch (e: unknown) {
      throwContractCallError(e);
    } finally {
      setIsSubmitting(false);
      await refetch();
    }
  }, [borrow, chainId]);

  const onSubmitBorrow = async () => {
    if (isFormBorrowEmpty(form)) {
      toast.error('Borrow or collateral amount are wrong');
      return;
    }
    if (!chainId || !account || !market || market.collateralAllowance.isZero())
      return;

    await showToast(handleBorrow(), {
      success: capitalize(t('common.success')),
      error: prop('message'),
      loading: capitalize(t('common.submit', { isLoading: 1 })),
    });
  };

  const onSubmitRepay = async () => {
    if (isFormRepayEmpty(form)) {
      toast.error(t('dineroMarketAddress.toastError'));
      return;
    }

    if (!chainId || !account || !market) return;

    await showToast(handleRepay(), {
      success: capitalize(t('common.success')),
      error: prop('message'),
      loading: capitalize(t('common.submit', { isLoading: 1 })),
    });
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
            isGettingData={market.loading && !error}
          />
          <UserLTV isLoading={market.loading && !error} ltv={currentLTV} />
          <LoanInfo
            kind={market.kind}
            loanInfoData={loanInfoData}
            isLoading={market.loading && !error}
          />
          <MyOpenPosition
            myPositionData={myPositionData}
            symbols={[market.symbol0, market.symbol1]}
            collateralUSDPrice={market.collateralUSDPrice}
            isLoading={market.loading && !error}
          />
          <YourBalance
            chainId={market.chainId}
            collateralName={market.name}
            dnrBalance={market.dnrBalance}
            intBalance={market.rewardsBalance}
            collateralBalance={market.collateralBalance}
            collateralDecimals={market.collateralDecimals}
            isPair={market.kind === DineroMarketKind.LpFreeMarket}
            currencyIcons={getDineroMarketSVGByAddress(
              market.chainId,
              market.marketAddress
            )}
            loading={market.loading && !error}
          />
        </Box>
      </Box>
      <Tooltip />
    </Container>
  );
};

export default DineroMarketPanel;
