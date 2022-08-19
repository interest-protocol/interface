import { FC } from 'react';

import { TOKENS_SVG_MAP } from '@/constants';
import Box from '@/elements/box';
import Typography from '@/elements/typography';
import { TOKEN_SYMBOL } from '@/sdk';
import { formatDollars, getERC20Data } from '@/utils';

import { EarnPoolDetailsProps } from './earn.pool-details.types';

const EarnPoolDetails: FC<EarnPoolDetailsProps> = ({
  apr,
  tvl,
  token0,
  token1,
  stable,
  chainId,
  allocation,
}) => {
  const [tokenA, tokenB] = [
    getERC20Data(chainId, token0),
    getERC20Data(chainId, token1),
  ];

  const IconA =
    TOKENS_SVG_MAP[tokenA?.symbol] ?? TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];
  const IconB =
    TOKENS_SVG_MAP[tokenB?.symbol] ?? TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  return (
    <Box>
      <Box display="flex" alignItems="center" px="L">
        {tokenA && (
          <Box as="span" display="inline-block" width="1.6rem" mr="M">
            <IconA />
          </Box>
        )}
        {tokenB && (
          <Box
            mr="M"
            as="span"
            ml="-1rem"
            width="1.6rem"
            display="inline-block"
          >
            <IconB />
          </Box>
        )}
        {`${tokenA?.symbol ?? ''}${(tokenA && tokenB && ' - ') ?? ''}${
          tokenB?.symbol ?? ''
        } `}
        Farm Details
      </Box>
      <Box
        p="L"
        my="L"
        rowGap="2rem"
        display="grid"
        bg="foreground"
        borderRadius="L"
        textAlign="center"
        gridTemplateColumns={['1fr 1fr', '1fr 1fr 1fr 1fr']}
      >
        <Box>
          <Typography variant="normal" fontSize="S" mb="L">
            TVL
          </Typography>
          {formatDollars(tvl)}
        </Box>
        <Box>
          <Typography variant="normal" fontSize="S" mb="L">
            APR
          </Typography>
          {apr.value().isZero() ? '0%' : apr.toPercentage()}
        </Box>
        <Box>
          <Typography variant="normal" fontSize="S" mb="L">
            Allocation
          </Typography>
          {allocation.value().isZero() ? '0%' : allocation.toPercentage(2)}
        </Box>
        <Box>
          <Typography variant="normal" fontSize="S" mb="L">
            Type
          </Typography>
          <Typography
            px="L"
            py="XS"
            fontSize="S"
            cursor="pointer"
            borderRadius="M"
            variant="normal"
            textAlign="center"
            display="inline-block"
            bg={stable ? 'accent' : 'accentAlternativeActive'}
          >
            {stable ? 'Stable' : 'Volatile'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default EarnPoolDetails;
