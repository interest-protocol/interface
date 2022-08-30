import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Box, Typography } from '@/elements';
import { FixedPointMath } from '@/sdk';
import { InfoSVG } from '@/svg';
import { toFixedToPrecision } from '@/utils';

import { MAILMarketPoolNetAprProps } from '../../mail-market-pool.types';

const MAILMarketPoolNetApr: FC<MAILMarketPoolNetAprProps> = ({
  loading,
  data,
}) => (
  <Box p="XL" bg="foreground" borderRadius="L">
    <Typography mb="M" variant="normal" pb="L">
      My Net APR
    </Typography>
    <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap="1rem">
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Typography
          mb="M"
          fontSize="S"
          variant="normal"
          color="textSecondary"
          textTransform="uppercase"
        >
          Net APR
          <Box
            as="span"
            cursor="help"
            data-tip={`Percentage in USD you are ${
              data.net.isPositive ? 'earning' : 'paying'
            } annually <br /> Formula: (rewards - debt) / (amount supplied - amount borrowed)`}
            display="inline-block"
            ml="M"
          >
            <InfoSVG width="0.8rem" />
          </Box>
        </Typography>
        <Typography variant="normal" fontWeight="500" fontSize="XL">
          {loading ? (
            <Skeleton width="80%" />
          ) : (
            `${data.net.isPositive ? '' : '-'}${toFixedToPrecision(
              FixedPointMath.from(data.net.rate).toNumber(16, 4, 4),
              4,
              3
            )}%`
          )}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
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
          <Box
            as="span"
            cursor="help"
            data-tip="Percentage in USD you are earning annually <br /> Formula: rewards / amount supplied"
            display="inline-block"
            ml="M"
          >
            <InfoSVG width="0.8rem" />
          </Box>
        </Typography>
        <Typography variant="normal" fontWeight="500" fontSize="XL">
          {loading ? (
            <Skeleton width="80%" />
          ) : (
            `${toFixedToPrecision(
              FixedPointMath.from(data.mySupplyRate).toNumber(16, 4, 4),
              4,
              3
            )}%`
          )}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
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
          <Box
            as="span"
            cursor="help"
            data-tip="Percentage in USD you are paying annually <br /> Formula: debt / amount supplied"
            display="inline-block"
            ml="M"
          >
            <InfoSVG width="0.8rem" />
          </Box>
        </Typography>
        <Typography variant="normal" fontWeight="500" fontSize="XL">
          {loading ? (
            <Skeleton width="80%" />
          ) : (
            `-${toFixedToPrecision(
              FixedPointMath.from(data.myBorrowRate).toNumber(16, 4, 4),
              4,
              3
            )}%`
          )}
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default MAILMarketPoolNetApr;
