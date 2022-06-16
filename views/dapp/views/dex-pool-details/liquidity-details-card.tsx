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
  <Box bg="foreground" p="L" borderRadius="M" width="100%">
    <Box mb="L">
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
      py="M"
      px="L"
      borderRadius="L"
      color="textSecondary"
      bg="bottomBackground"
      border="0.09rem solid"
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
