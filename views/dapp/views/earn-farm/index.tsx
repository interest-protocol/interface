import { FC, useMemo } from 'react';

import { Container } from '@/components';
import { RoutesEnum } from '@/constants';
import { useChainId, useGetUserFarmData } from '@/hooks';

import GoBack from '../../components/go-back';
import ErrorView from '../error';
import { EarnFarmDetails, EarnFarmOptions } from './components';
import { EarnFarmProps } from './earn-farm.types';
import { getSafeUserFarmData } from './earn-farm.utils';

const EarnFarm: FC<EarnFarmProps> = ({ address }) => {
  const { error, data: rawData, mutate } = useGetUserFarmData(address);

  const chainId = useChainId();

  const data = useMemo(
    () => getSafeUserFarmData(chainId, address, rawData),
    [rawData, chainId, address]
  );

  if (error) return <ErrorView message="Error fetching contract" />;

  return (
    <Container dapp width="100%" mt="XL">
      <GoBack route={RoutesEnum.Earn} />
      <EarnFarmDetails farm={data.farm} />
      <EarnFarmOptions
        farm={data.farm}
        intUSDPrice={data.intUSDPrice}
        mutate={mutate}
        loading={data.loading}
      />
    </Container>
  );
};

export default EarnFarm;
