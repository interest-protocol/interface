import { FC } from 'react';

import { Box, Typography } from '@/elements';

import OutOfRange from './out-of-range';
import { LiquidityProps } from './pool.type';

const Liquidity: FC<LiquidityProps> = ({
  Par1TokenSVG,
  Par2TokenSVG,
  symbol1,
  symbol2,
  perceptual,
  minValue,
  maxValue,
  hasWarning,
}) => (
  <Box
    cursor="pointer"
    bg="bottomBackground"
    hover={{ bg: 'textSoft' }}
    p="M"
    borderRadius="0.8rem"
    display="flex"
    mb="M"
  >
    <Box>
      <Box display="flex" mb="M">
        <Box my="M" display="flex" alignItems="center">
          <Par1TokenSVG width="1rem" height="1rem" />
          <Par2TokenSVG width="1rem" height="1rem" />
          <Typography mx="M" as="span" variant="normal" fontWeight="600">
            {symbol1} / {symbol2}
          </Typography>
        </Box>
        <Box
          bg="background"
          display="flex"
          alignItems="center"
          px="M"
          borderRadius="2rem"
        >
          {perceptual} %
        </Box>
      </Box>
      <Box>
        <Typography variant="normal" fontSize="0.8rem" fontWeight="500">
          <Typography
            variant="normal"
            as="span"
            fontSize="0.8rem"
            color="textSecondary"
          >
            Min:{' '}
          </Typography>
          {minValue} {symbol1} per {symbol2}
          <Typography variant="normal" as="span" color="textSecondary">
            {' ⟷ '}
          </Typography>
          <Typography
            variant="normal"
            as="span"
            fontSize="0.8rem"
            color="textSecondary"
          >
            Max:{' '}
          </Typography>
          {maxValue} {symbol1} per {symbol2}
        </Typography>
      </Box>
    </Box>
    {hasWarning && <OutOfRange />}
  </Box>
);

export default Liquidity;
