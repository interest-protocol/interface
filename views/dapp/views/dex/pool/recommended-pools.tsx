import { FC } from 'react';
import { v4 } from 'uuid';

import { PoolType, RECOMMENDED_POOLS } from '@/constants';
import { Box, Typography } from '@/elements';
import { useChainId } from '@/hooks';

import { RecommendedPoolsProps } from './pool.types';
import PoolRow from './pool-row';

const RecommendedPools: FC<RecommendedPoolsProps> = ({ type }) => {
  const chainId = useChainId();

  return (
    <Box pb="L" pt="M" mb="L" px="L" bg="foreground" borderRadius="M">
      <Typography variant="normal" width="100%" my="L">
        Recommended {type === PoolType.Volatile ? 'Volatile' : 'Stable'} Pools
      </Typography>
      {RECOMMENDED_POOLS[chainId][type].map(
        ({ token0, token1, pairAddress }) => (
          <PoolRow
            key={v4()}
            symbol0={token0.symbol}
            symbol1={token1.symbol}
            pairAddress={pairAddress}
          />
        )
      )}
    </Box>
  );
};

export default RecommendedPools;
