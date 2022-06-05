import { compose, join, map, values } from 'ramda';
import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Container } from '@/components';
import { RECOMMENDED_ERC_20_DATA, RoutesEnum } from '@/constants';
import { Box, Typography } from '@/elements';
import { useGetMailMarketData } from '@/hooks';
import { IntMath } from '@/sdk';
import { getChainId } from '@/state/core/core.selectors';
import { formatDollars, getArrayWithUniqueValues } from '@/utils';

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
  processMAILMarketData,
} from './utils';

const MAILMarketPool: FC<MAILMarketPoolProps> = ({ pool }) => {
  const { data: rawData, error } = useGetMailMarketData(pool);
  const chainId = useSelector(getChainId) as number | null;

  const { loading, data, metadata, validId } = useMemo(
    () => processMAILMarketData(rawData, chainId),
    [rawData, chainId]
  );

  const { mySupply, myBorrow } = useMemo(
    () => calculateMySupplyAndBorrow(data),
    [data]
  );

  const aprData = useMemo(() => calculateAPRs(data, validId), [validId, data]);

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
          {chainId &&
            compose(
              join(' | '),
              getArrayWithUniqueValues,
              map(({ symbol }) => symbol),
              values
            )(RECOMMENDED_ERC_20_DATA[chainId])}{' '}
          | {metadata.symbol}
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
          <MAILMarketPoolRisk loading={loading} />
        </Box>
        <Box
          id="mail-supply-borrow-markets"
          display="grid"
          columnGap="1rem"
          gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
        >
          <MAILMarketPoolTable loading={loading} favorite type="supply" />
          <MAILMarketPoolTable loading={loading} favorite type="borrow" />
          <MAILMarketPoolTable loading={loading} type="supply" />
          <MAILMarketPoolTable loading={loading} type="borrow" />
        </Box>
      </Container>
    </Box>
  );
};
export default MAILMarketPool;
