import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Box, Typography } from '@/elements';
import { formatDollars } from '@/utils';

import { MAILMarketPoolBalanceProps } from './mail-market-pool-balance.types';

const MAILMarketPoolBalance: FC<MAILMarketPoolBalanceProps> = ({
  type,
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
      My {type} Balance
    </Typography>
    <Typography variant="normal" fontWeight="500" fontSize="XL">
      {loading ? <Skeleton /> : formatDollars(+balance)}
    </Typography>
  </Box>
);

export default MAILMarketPoolBalance;
