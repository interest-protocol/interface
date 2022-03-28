import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { Box, Button, Typography } from '@/elements';

import { BorrowFormLiquidationProps } from './borrow-form.types';

const BorrowFormLiquidationFee: FC<BorrowFormLiquidationProps> = ({
  control,
  setValue,
  ltvRatio,
}) => {
  const borrowLiquidationFee = useWatch({
    control,
    name: 'borrow.liquidationFee',
  });

  const handleSetFee = (fee: number) => () =>
    setValue('borrow.liquidationFee', fee);

  return (
    <Box mt="XL">
      <Typography variant="normal" fontSize="S">
        Liquidation price
      </Typography>
      <Box display="flex" justifyContent="space-between" my="L">
        {[0, 25, 50, 75, 100].map((item) => (
          <Button
            key={v4()}
            width="3rem"
            fontSize="S"
            height="3rem"
            type="button"
            display="flex"
            borderRadius="M"
            variant="secondary"
            alignItems="center"
            justifyContent="center"
            onClick={handleSetFee(item / 100)}
            disabled={!!ltvRatio && item >= ltvRatio}
            cursor={!!ltvRatio && item >= ltvRatio ? 'not-allowed' : 'pointer'}
            hover={{
              bg: !!ltvRatio && item >= ltvRatio ? 'disabled' : 'accent',
            }}
            active={{
              bg: !!ltvRatio && item >= ltvRatio ? 'disabled' : 'accentActive',
            }}
            bg={
              borrowLiquidationFee * 100 === item
                ? 'background'
                : !!ltvRatio && item >= ltvRatio
                ? 'disabled'
                : 'bottomBackground'
            }
          >
            {item}%
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default BorrowFormLiquidationFee;
