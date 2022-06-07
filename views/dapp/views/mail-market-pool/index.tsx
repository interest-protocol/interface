import { compose, join, map, prepend, prop, propOr } from 'ramda';
import { FC, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Container } from '@/components';
import { MAIL_BRIDGE_TOKENS_ARRAY, RoutesEnum } from '@/constants';
import { Box, Typography } from '@/elements';
import { useGetMailMarketData } from '@/hooks';
import { IntMath } from '@/sdk';
import { getChainId } from '@/state/core/core.selectors';
import { formatDollars } from '@/utils';

import GoBack from '../../components/go-back';
import ErrorView from '../error';
import { MAILMarketPoolBalance, MAILMarketPoolTable } from './components';
import MAILMarketPoolInfo from './components/mail-market-pool-info';
import MAILMarketPoolNetApr from './components/mail-market-pool-net-apr';
import MAILMarketPoolRisk from './components/mail-market-pool-risk';
import { MAILMarketPoolProps } from './mail-market-pool.types';
import {
  calculateAPRs,
  calculateMySupplyAndBorrow,
  calculatePoolRisk,
  calculateTotalBorrowsInUSD,
  processMAILMarketData,
  processMarkets,
} from './utils';

const MAILMarketPool: FC<MAILMarketPoolProps> = ({ pool }) => {
  const { data: rawData, error, mutate } = useGetMailMarketData(pool);
  const chainId = useSelector(getChainId) as number | null;

  const { loading, data, metadata, validId } = useMemo(
    () => processMAILMarketData(rawData, chainId),
    [rawData, chainId]
  );

  const { mySupply, myBorrow } = useMemo(
    () => calculateMySupplyAndBorrow(data),
    [data]
  );

  const bridgeTokens = useMemo(
    () => propOr([], validId.toString(), MAIL_BRIDGE_TOKENS_ARRAY),
    [validId]
  );

  const markets = useMemo(
    () => processMarkets(data, metadata, validId),
    [data, metadata, validId]
  );

  const aprData = useMemo(() => calculateAPRs(data, validId), [validId, data]);

  const totalBorrowsInUSDRecord = useMemo(
    () => calculateTotalBorrowsInUSD(data),
    [data]
  );

  const refreshData = useCallback(async () => {
    try {
      await mutate();
      // eslint-disable-next-line no-empty
    } catch {}
  }, [mutate]);

  if (error) return <ErrorView message="error getting mail market data" />;

  return (
    <Box flex="1" display="flex" flexDirection="column">
      <Container
        dapp
        large
        px="M"
        mt="XL"
        width="100%"
        position="relative"
        background="specialBackground"
      >
        <Box display="flex" justifyContent="space-between">
          <GoBack route={RoutesEnum.MAILMarket} />
          <a href="#mail-supply-borrow-markets">
            <Typography
              color="accent"
              variant="normal"
              display={['block', 'block', 'block', 'none']}
              hover={{
                color: 'accentActive',
              }}
            >
              See Markets
            </Typography>
          </a>
        </Box>
        <Typography variant="normal" ml="M">
          Borrow & Lend &rarr;{' '}
          {!loading &&
            compose(
              join(' - '),
              prepend(metadata.symbol),
              map(prop('symbol'))
            )(bridgeTokens)}
        </Typography>
        <Box
          mt="XL"
          display="grid"
          gridGap="1rem"
          gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
        >
          <MAILMarketPoolInfo metadata={metadata} />
          <Box
            display="grid"
            gridColumnGap="1rem"
            gridTemplateColumns="1fr 1fr"
          >
            <MAILMarketPoolBalance
              type="supply"
              balance={formatDollars(IntMath.toNumber(mySupply))}
              loading={loading}
            />
            <MAILMarketPoolBalance
              type="borrow"
              balance={formatDollars(IntMath.toNumber(myBorrow))}
              loading={loading}
            />
          </Box>
          <MAILMarketPoolNetApr data={aprData} loading={loading} />
          <MAILMarketPoolRisk
            loading={loading}
            risk={calculatePoolRisk(totalBorrowsInUSDRecord)}
          />
        </Box>
        <Box
          id="mail-supply-borrow-markets"
          display="grid"
          columnGap="1rem"
          gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
        >
          <MAILMarketPoolTable
            loading={loading}
            markets={markets.activeSupplyMarkets}
            totalBorrowsInUSDRecord={totalBorrowsInUSDRecord}
            active
            type="supply"
            pool={pool}
            refreshData={refreshData}
          />
          <MAILMarketPoolTable
            loading={loading}
            markets={markets.activeBorrowMarkets}
            totalBorrowsInUSDRecord={totalBorrowsInUSDRecord}
            active
            type="borrow"
            pool={pool}
            refreshData={refreshData}
          />
          <MAILMarketPoolTable
            loading={loading}
            markets={markets.supplyMarkets}
            totalBorrowsInUSDRecord={totalBorrowsInUSDRecord}
            type="supply"
            pool={pool}
            refreshData={refreshData}
          />
          <MAILMarketPoolTable
            loading={loading}
            markets={markets.borrowMarkets}
            totalBorrowsInUSDRecord={totalBorrowsInUSDRecord}
            type="borrow"
            pool={pool}
            refreshData={refreshData}
          />
        </Box>
      </Container>
    </Box>
  );
};
export default MAILMarketPool;
