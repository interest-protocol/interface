import { yupResolver } from '@hookform/resolvers/yup';
import { ethers } from 'ethers';
import { pathOr } from 'ramda';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNow } from 'use-intl';

import { Container, Tooltip } from '@/components';
import { getDineroMarketSVGByAddress } from '@/constants';
import {
  DINERO_MARKET_METADATA,
  DineroMarketKind,
  RoutesEnum,
} from '@/constants';
import { Box } from '@/elements';
import { useGetDineroMarketDataV2 } from '@/hooks';
import { useIdAccount } from '@/hooks/use-id-account';

import GoBack from '../../components/go-back';
import ErrorPage from '../error';
import { borrowFormValidation } from './components/borrow-form/borrow-form.validator';
import LoanInfo from './components/loan-info';
import MyOpenPosition from './components/my-open-position';
import UserLTV from './components/user-ltv';
import YourBalance from './components/your-balance';
import { BORROW_DEFAULT_VALUES } from './dinero-market.data';
import { DineroMarketPanelProps, IBorrowForm } from './dinero-market.types';
import {
  calculatePositionHealth,
  getLoanInfoData,
  getMyPositionData,
  getSafeDineroMarketData,
  loanPrincipalToElastic,
} from './dinero-market.utils';
import DineroMarketForm from './dinero-market-form';
import DineroMarketSwitch from './dinero-market-switch';

const DineroMarketPanel: FC<DineroMarketPanelProps> = ({ address, mode }) => {
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

  const now = useNow({ updateInterval: 60000 });

  const market = useMemo(
    () =>
      getSafeDineroMarketData(chainId, now.getTime(), address, marketRawData),
    [marketRawData, address, chainId]
  );

  const form = useForm<IBorrowForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: BORROW_DEFAULT_VALUES,
    resolver: yupResolver(borrowFormValidation),
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
          now: now.getTime(),
        }).value()
      ).toNumber(16, 0, 4),
    [market]
  );

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
            isGettingData={market.loading && !error}
            refetch={async () => {
              await refetch();
            }}
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
