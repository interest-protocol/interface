import { FC } from 'react';
import { v4 } from 'uuid';

import { getFarmsSVGByToken } from '@/constants';
import Box from '@/elements/box';
import Typography from '@/elements/typography';
import { TOKEN_SYMBOL } from '@/sdk';
import { formatDollars, makeFarmSymbol } from '@/utils';

import { EarnPoolDetailsProps } from './earn.pool-details.types';

const EarnPoolDetails: FC<EarnPoolDetailsProps> = ({ farm }) => (
  <Box>
    <Box display="flex" alignItems="center" px="L">
      {getFarmsSVGByToken(farm.chainId, farm.token0, farm.token1).map(
        ({ SVG, highZIndex }, index) => (
          <Box
            key={v4()}
            width="1.6rem"
            ml={index != 0 ? '-0.5rem' : 'NONE'}
            zIndex={index == 0 ? (highZIndex ? 3 : 'unset') : 'unset'}
          >
            <SVG width="100%" />
          </Box>
        )
      )}
      {farm.id === 0
        ? `${TOKEN_SYMBOL.INT} Pool `
        : `${makeFarmSymbol(farm.chainId, farm.token0, farm.token1)} Farm `}
      Details
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
        {formatDollars(farm.tvl)}
      </Box>
      <Box>
        <Typography variant="normal" fontSize="S" mb="L">
          APR
        </Typography>
        {farm.apr.value().isZero() ? '0%' : farm.apr.toPercentage()}
      </Box>
      <Box>
        <Typography variant="normal" fontSize="S" mb="L">
          Allocation
        </Typography>
        {farm.allocation.value().isZero()
          ? '0%'
          : farm.allocation.toPercentage(2)}
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
          bg={farm.stable ? 'accent' : 'accentAlternativeActive'}
        >
          {farm.stable ? 'Stable' : 'Volatile'}
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default EarnPoolDetails;
