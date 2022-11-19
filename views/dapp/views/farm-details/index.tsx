import { useTranslations } from 'next-intl';
import { FC, useMemo } from 'react';

import { Container } from '@/components';
import { RoutesEnum } from '@/constants';
import { GAAction, GACategory } from '@/constants/google-analytics';
import { useChainId, useGetUserFarmData } from '@/hooks';
import { logException } from '@/utils/analytics';

import GoBack from '../../components/go-back';
import ErrorView from '../error';
import Details from './components/farm-details';
import FarmOptions from './components/farm-options';
import { getSafeUserFarmData } from './farm.utils';
import { FarmDetailsProps } from './farm-details.types';

const FarmDetails: FC<FarmDetailsProps> = ({ address }) => {
  const t = useTranslations();
  const { error, data: rawData, refetch } = useGetUserFarmData(address);

  const chainId = useChainId();

  const data = useMemo(
    () => getSafeUserFarmData(chainId, address, rawData),
    [rawData, chainId, address]
  );

  if (error) {
    logException(
      GACategory.Error,
      GAAction.ErrorPage,
      `Error Page: Error fetching contract`,
      ['views\\dapp\\views\\farm-details\\index.tsx']
    );
    return <ErrorView message={t('error.fetchingContract')} />;
  }

  return (
    <Container dapp width="100%" mt="XL">
      <GoBack route={RoutesEnum.Farms} />
      <Details farm={data.farm} />
      <FarmOptions
        farm={data.farm}
        intUSDPrice={data.intUSDPrice}
        refetch={async () => {
          await refetch();
        }}
        loading={data.loading}
      />
    </Container>
  );
};

export default FarmDetails;
