import { FC } from 'react';

import { Box, Typography } from '@/elements';

import { LiquidityDetailsCardLineProps } from './pool.type';

const LiquidityDetailsCardLine: FC<LiquidityDetailsCardLineProps> = ({
  TokenSVG,
  symbol,
  perceptual,
  value,
}) => (
  <Box display="flex" justifyContent="space-between" mb="M">
    <Box>
      <TokenSVG width="1rem" height="1rem" />
      <Typography
        mx="M"
        as="span"
        color="textSecondary"
        variant="normal"
        fontWeight="500"
      >
        {symbol}
      </Typography>
    </Box>
    <Box display="flex" alignItems="center">
      <Typography variant="normal" mr="M" fontSize="0.8rem" fontWeight="600">
        {value}
      </Typography>
      <Typography
        fontSize="0.8rem"
        variant="normal"
        bg="background"
        p="M"
        borderRadius="L"
      >
        {perceptual}%
      </Typography>
    </Box>
  </Box>
);

export default LiquidityDetailsCardLine;
