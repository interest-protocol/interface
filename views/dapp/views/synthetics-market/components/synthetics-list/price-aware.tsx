import { useTranslations } from 'next-intl';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import Box from '@/elements/box';
import { FixedPointMath, ZERO_BIG_NUMBER } from '@/sdk';
import { capitalize, formatMoney } from '@/utils';

import { useGetTokenUSDPrice } from '../../synthetics-market.hooks';
import { PriceAwareProps } from './synthetics-list.types';

const PriceAware: FC<PriceAwareProps> = ({ market, collateralSymbol }) => {
  const { isLoading, data, error } = useGetTokenUSDPrice({
    chainId: market.chainId,
    account: '',
    marketAddress: market.marketAddress,
    dataFeedId: market.dataFeedId,
  });

  const t = useTranslations();

  if (error) return <>{capitalize(t('common.error'))}</>;

  if (isLoading)
    return (
      <Box>
        <Skeleton width="5rem" />
      </Box>
    );

  return (
    <>
      {`${formatMoney(
        FixedPointMath.toNumber(data || ZERO_BIG_NUMBER)
      )} ${collateralSymbol}`}
    </>
  );
};

export default PriceAware;
