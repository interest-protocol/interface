import { FC } from 'react';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';

import { LiquidityDetailsCardLineProps } from '../../dex-pool-details.types';

const LiquidityDetailsCardLine: FC<LiquidityDetailsCardLineProps> = ({
  value,
  symbol,
  perceptual,
}) => {
  const TokenSVG =
    TOKENS_SVG_MAP[symbol] ?? TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  return (
    <Box display="flex" justifyContent="space-between" my="M">
      <Box display="flex" alignItems="center">
        <TokenSVG width="1.2rem" />
        <Typography
          mx="M"
          as="span"
          variant="normal"
          fontWeight="500"
          color="textSecondary"
        >
          {symbol}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="normal" mr="M" fontSize="0.8rem">
          {value}
        </Typography>
        <Typography
          p="M"
          bg="background"
          variant="normal"
          borderRadius="L"
          fontSize="0.8rem"
        >
          {perceptual}%
        </Typography>
      </Box>
    </Box>
  );
};

export default LiquidityDetailsCardLine;
