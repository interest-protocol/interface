import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Box, Typography } from '@/elements';
import { ProgressSVG } from '@/svg';

import { MAILMarketLoadingProps } from '../../mail-market-pool.types';

const MAILMarketPoolRisk: FC<MAILMarketLoadingProps> = ({ loading }) => (
  <Box bg="foreground" p="XL" borderRadius="L">
    <Typography
      mb="XL"
      fontSize="S"
      variant="normal"
      color="textSecondary"
      textTransform="uppercase"
    >
      Borrow Risk
    </Typography>
    <Box display="flex" alignItems="center">
      <Typography variant="normal" mr="XL">
        {loading ? <Skeleton width="3rem" /> : '20%'}
      </Typography>
      <ProgressSVG width="100%" progress={20} custom height={10} />
      <Typography variant="normal" ml="XL">
        100%
      </Typography>
    </Box>
  </Box>
);

export default MAILMarketPoolRisk;
