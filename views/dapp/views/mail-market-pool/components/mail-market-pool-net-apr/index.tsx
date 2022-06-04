import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Box, Typography } from '@/elements';
import { InfoSVG } from '@/svg';

import { MAILMarketLoadingProps } from '../../mail-market-pool.types';

const MAILMarketPoolNetApr: FC<MAILMarketLoadingProps> = ({ loading }) => {
  return (
    <Box p="XL" bg="foreground" borderRadius="L">
      <Typography mb="M" variant="normal" pb="L">
        My Net APR
      </Typography>
      <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap="1rem">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography
            mb="M"
            fontSize="S"
            variant="normal"
            color="textSecondary"
            textTransform="uppercase"
          >
            Net APR
          </Typography>
          <Typography variant="normal" fontWeight="500" fontSize="XL">
            {loading ? <Skeleton width="80%" /> : '20%'}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography
            mb="M"
            fontSize="S"
            display="flex"
            variant="normal"
            alignItems="center"
            color="textSecondary"
            textTransform="uppercase"
          >
            Supply APR
            <Box as="span" display="inline-block" ml="M">
              <InfoSVG width="0.8rem" />
            </Box>
          </Typography>
          <Typography variant="normal" fontWeight="500" fontSize="XL">
            {loading ? <Skeleton width="80%" /> : '20%'}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography
            mb="M"
            fontSize="S"
            display="flex"
            variant="normal"
            alignItems="center"
            color="textSecondary"
            textTransform="uppercase"
          >
            Borrow APR
            <Box as="span" display="inline-block" ml="M">
              <InfoSVG width="0.8rem" />
            </Box>
          </Typography>
          <Typography variant="normal" fontWeight="500" fontSize="XL">
            {loading ? <Skeleton width="80%" /> : '20%'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default MAILMarketPoolNetApr;
