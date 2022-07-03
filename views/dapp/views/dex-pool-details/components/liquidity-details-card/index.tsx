import { FC } from 'react';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';

import { LiquidityDetailsCardProps } from '../../dex-pool-details.types';
import LiquidityDetailsCardLine from '../liquidity-details-card-line';

const LiquidityDetailsCard: FC<LiquidityDetailsCardProps> = ({
  title,
  lines,
  totalDeposits,
}) => (
  <Box
    p="L"
    width="100%"
    display="flex"
    bg="foreground"
    borderRadius="M"
    flexDirection="column"
    justifyContent="space-between"
  >
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
