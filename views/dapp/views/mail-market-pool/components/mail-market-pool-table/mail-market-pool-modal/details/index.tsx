import { FC, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { Box, Typography } from '@/elements';

import {
  calculateDetails,
  calculateLiquidationRisk,
  processDetailsInfo,
} from '../utils';
import { DetailsProps } from './details.types';

const Details: FC<DetailsProps> = ({
  type,
  data,
  control,
  base,
  totalBorrowsInUSDRecord,
}) => {
  const value = useWatch({
    control,
    name: 'value',
  });

  const { currentRisk, poolRisk } = useMemo(
    () =>
      calculateLiquidationRisk(
        data,
        base,
        type,
        totalBorrowsInUSDRecord,
        value
      ),
    [data, base, type, totalBorrowsInUSDRecord, value]
  );

  const typeDetails = useMemo(
    () => calculateDetails(data, base, type, totalBorrowsInUSDRecord, value),
    [data, base, type, totalBorrowsInUSDRecord, value]
  );

  return (
    <Box mt="L" mb="XL" bg="background" p="L" borderRadius="M">
      <Box
        py="M"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          fontSize="S"
          variant="normal"
          color="textSecondary"
          textTransform="uppercase"
        >
          {processDetailsInfo(base, type, data.symbol)}
        </Typography>
        <Typography variant="normal">{typeDetails}</Typography>
      </Box>
      <Box
        py="M"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          fontSize="S"
          variant="normal"
          color="textSecondary"
          textTransform="uppercase"
        >
          Liquidation Risk
        </Typography>
        <Typography variant="normal">
          <Typography
            as="span"
            variant="normal"
            color={currentRisk && poolRisk >= 80 ? 'error' : 'text'}
          >
            {currentRisk ?? ''}%
          </Typography>{' '}
          &rarr;{' '}
          <Typography
            as="span"
            variant="normal"
            color={poolRisk && poolRisk >= 80 ? 'error' : 'text'}
          >
            {poolRisk ?? ''}%
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default Details;
