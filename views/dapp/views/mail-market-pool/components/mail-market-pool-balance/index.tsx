import { FC } from 'react';

import { Box, Typography } from '@/elements';
import { formatDollars } from '@/utils';

import { MAILMarketPoolBalanceProps } from './mail-market-pool-balance.types';

const MAILMarketPoolBalance: FC<MAILMarketPoolBalanceProps> = ({
  type,
  balance,
}) => (
  <Box display="flex" flexDirection="column" my="M" textAlign="center">
    <Typography variant="normal" textTransform="uppercase" mb="L">
      {type} Balance
    </Typography>
    <Typography variant="normal" fontWeight="500" fontSize="L">
      {formatDollars(+balance)}
    </Typography>
  </Box>
);

export default MAILMarketPoolBalance;
