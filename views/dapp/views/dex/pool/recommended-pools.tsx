import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Box, Typography } from '@/elements';
import { useLocale } from '@/hooks';
import { capitalize } from '@/utils';

const RecommendedPools: FC<{ type: string }> = ({ type }) => {
  const { currentLocale } = useLocale();
  const t = useTranslations();

  return (
    <Box pb="L" pt="M" mb="L" px="L" bg="foreground" borderRadius="2rem">
      <Typography variant="normal" width="100%" my="L" color="textSecondary">
        {t('dexPool.recommendedTitle', {
          currentLocale,
          type: capitalize(
            t(type === '1' ? 'common.volatile' : 'common.stable', { count: 2 })
          ),
        })}
      </Typography>
      {/*RECOMMENDED_POOLS[chainId][type].map(
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
        )*/}
    </Box>
  );
};

export default RecommendedPools;
