import { FC } from 'react';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';

import { LiquidityDetailsCardLineProps } from '../dex/pool/pool.types';

const LiquidityDetailsCardLine: FC<LiquidityDetailsCardLineProps> = ({
  value,
  symbol,
  perceptual,
}) => {
  const TokenSVG =
    TOKENS_SVG_MAP[symbol] ?? TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  return (
    <Box display="flex" justifyContent="space-between" my="M">
      <Box>
        <TokenSVG width="1rem" height="1rem" />
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
};

export default LiquidityDetailsCardLine;
