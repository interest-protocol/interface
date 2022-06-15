import { FC } from 'react';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';

import { LiquidityDetailsCardProps } from '../dex/pool/pool.types';
import LiquidityDetailsCardLine from './liquidity-details-card-line';

const LiquidityDetailsCard: FC<LiquidityDetailsCardProps> = ({
  title,
  lines,
  totalDeposits,
}) => (
  <Box bg="foreground" pb="XL" px="L" borderRadius="M" width="100%">
    <Box py="L">
      <Typography
        width="100%"
        fontSize="S"
        variant="normal"
        textTransform="uppercase"
      >
        {title}
      </Typography>
      <Typography mt="M" variant="normal" fontWeight="500" fontSize="XL">
        {totalDeposits}
      </Typography>
    </Box>
    <Box
      py="L"
      px="M"
      borderRadius="M"
      color="textSecondary"
      bg="bottomBackground"
      border="0.09rem solid"
      borderColor="textSecondary"
    >
      {lines.map((line) => (
        <LiquidityDetailsCardLine
          key={v4()}
          value={line.value}
          symbol={line.symbol}
          perceptual={line.perceptual}
        />
      ))}
    </Box>
  </Box>
);

export default LiquidityDetailsCard;
