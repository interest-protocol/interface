import { FC } from 'react';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';

import LiquidityDetailsCardLine from './liquidity-details-card-line';
import { LiquidityDetailsCardProps } from './pool.type';

const LiquidityDetailsCard: FC<LiquidityDetailsCardProps> = ({
  title,
  lines,
}) => (
  <Box bg="foreground" width="49%" pb="XL" px="L" borderRadius="M">
    <Box py="L">
      <Typography variant="normal" width="100%" fontWeight="600">
        {title}
      </Typography>
      <Typography mt="M" variant="normal" fontWeight="500" fontSize="2.5rem">
        $ -
      </Typography>
    </Box>
    <Box
      bg="bottomBackground"
      py="L"
      px="M"
      borderRadius="M"
      border="0.09rem solid"
      borderColor="textSecondary"
      color="textSecondary"
    >
      {lines.map((line) => (
        <LiquidityDetailsCardLine
          TokenSVG={line.TokenSVG}
          symbol={line.symbol}
          value={line.value}
          perceptual={line.perceptual}
          key={v4()}
        />
      ))}
    </Box>
  </Box>
);

export default LiquidityDetailsCard;
