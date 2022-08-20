import { propEq } from 'ramda';
import { FC, useMemo } from 'react';

import { Container } from '@/components';
import { RoutesEnum } from '@/constants';
import { useChainId, useGetFarmsSummary } from '@/hooks';

import GoBack from '../../components/go-back';
import { getSafeFarmSummaryData } from '../earn/earn.utils';
import ErrorView from '../error';
import { EarnPoolDetails, EarnPoolOptions } from './components';
import { EarnPoolProps } from './earn-pool.types';

const EarnPool: FC<EarnPoolProps> = ({ address }) => {
  const chainId = useChainId();

  const { error, data: rawData, mutate } = useGetFarmsSummary();

  const data = useMemo(
    () => getSafeFarmSummaryData(chainId, rawData),
    [rawData, chainId]
  );

  const farm = useMemo(
    () => data.farms.find(propEq('stakingTokenAddress', address)),
    [data]
  );

  if (error) return <ErrorView message="Error fetching contract" />;

  if (!farm) return <ErrorView message="Farm not found" />;

  return (
    <Container dapp width="100%" mt="XL">
      <GoBack route={RoutesEnum.Earn} />
      <EarnPoolDetails {...farm} />
      <EarnPoolOptions
        farm={farm}
        intUSDPrice={data.intUSDPrice}
        mutate={mutate}
        loading={data.loading}
      />
    </Container>
  );
};

export default EarnPool;
