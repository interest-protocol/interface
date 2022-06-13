import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Box, Typography } from '@/elements';
import { ProgressSVG } from '@/svg';

import { MAILMarketPoolRiskProps } from '../../mail-market-pool.types';

const MAILMarketPoolRisk: FC<MAILMarketPoolRiskProps> = ({ loading, risk }) => (
  <Box bg="foreground" p="XL" borderRadius="L">
    <Typography
      mb="XL"
      fontSize="S"
      variant="normal"
      color="textSecondary"
      textTransform="uppercase"
    >
      Liquidation Risk
    </Typography>
    <Box display="flex" alignItems="center">
      <Typography variant="normal" mr="XL">
        {loading ? <Skeleton width="3rem" /> : `${risk}%`}
      </Typography>
      <ProgressSVG width="100%" progress={risk} custom height={10} />
      <Typography variant="normal" ml="XL">
        100%
      </Typography>
    </Box>
  </Box>
);

export default MAILMarketPoolRisk;
