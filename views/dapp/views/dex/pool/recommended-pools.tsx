import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { v4 } from 'uuid';

import { PoolType, RECOMMENDED_POOLS } from '@/constants';
import { Box, Typography } from '@/elements';
import { useChainId, useLocale } from '@/hooks';
import { capitalize } from '@/utils';

import { RecommendedPoolsProps } from './pool.types';
import PoolRow from './pool-row';

const RecommendedPools: FC<RecommendedPoolsProps> = ({ type }) => {
  const { currentLocale } = useLocale();
  const t = useTranslations();
  const chainId = useChainId();

  return (
    <Box pb="L" pt="M" mb="L" px="L" bg="foreground" borderRadius="2rem">
      <Typography variant="normal" width="100%" my="L" color="textSecondary">
        {t('dexPool.recommendedTitle', {
          currentLocale,
          type: capitalize(
            t(
              type === PoolType.Volatile ? 'common.volatile' : 'common.stable',
              { count: 2 }
            )
          ),
        })}
      </Typography>
      {RECOMMENDED_POOLS[chainId][type].map(
        ({ token0, token1, pairAddress }) => (
          <PoolRow
            key={v4()}
            chainId={chainId}
            symbol0={token0.symbol}
            symbol1={token1.symbol}
            address0={token0.address}
            address1={token1.address}
            pairAddress={pairAddress}
          />
        )
      )}
    </Box>
  );
};

export default RecommendedPools;
