import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Box, Typography } from '@/elements';

import { MAILMarketPoolBalanceProps } from './mail-market-pool-balance.types';

const MAILMarketPoolBalance: FC<MAILMarketPoolBalanceProps> = ({
  text,
  balance,
  loading,
}) => (
  <Box
    p="XL"
    display="flex"
    bg="foreground"
    borderRadius="L"
    textAlign="center"
    flexDirection="column"
    justifyContent="center"
  >
    <Typography
      mb="M"
      fontSize="S"
      variant="normal"
      color="textSecondary"
      textTransform="uppercase"
    >
      {text}
    </Typography>
    <Typography variant="normal" fontWeight="500" fontSize="XL">
      {loading ? <Skeleton /> : balance}
    </Typography>
  </Box>
);

export default MAILMarketPoolBalance;
