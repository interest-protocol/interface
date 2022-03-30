import { BigNumber, ethers } from 'ethers';
import { FC, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { Box, Button, Typography } from '@/elements';
import { Fraction } from '@/sdk/entities/fraction';
import { calculateBorrowAmount } from '@/utils/dinero-market';

import { BorrowFormSelectLTVProps } from './borrow-form.types';

const BorrowFormSelectLTV: FC<BorrowFormSelectLTVProps> = ({
  data,
  control,
  setValue,
  currencyDiff,
}) => {
  const borrowCollateral = useWatch({
    control,
    name: 'borrow.collateral',
  });
  const borrowLoan = useWatch({
    control,
    name: 'borrow.loan',
  });

  const handleSetFee = (intendedLTV: number) => () => {
    if (!data) return;

    setValue(
      'borrow.loan',
      `${calculateBorrowAmount(
        data.userCollateral.add(ethers.utils.parseEther(borrowCollateral)),
        data.userLoan,
        data.exchangeRate,
        BigNumber.from(intendedLTV).mul(BigNumber.from(10).pow(16)),
        data.totalLoan
      )
        .value()
        .div(ethers.utils.parseEther('1'))
        .toNumber()}`
    );
  };

  const ltvRatio = useMemo(() => {
    if (!data?.ltvRatio) return 0;
    return (
      +Fraction.from(data.ltvRatio, ethers.utils.parseEther('1')).toSignificant(
        4
      ) * 100
    );
  }, [data?.ltvRatio]);

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
            onClick={handleSetFee(item)}
            disabled={!!ltvRatio && item >= ltvRatio}
            cursor={!!ltvRatio && item >= ltvRatio ? 'not-allowed' : 'pointer'}
            hover={{
              bg: !!ltvRatio && item >= ltvRatio ? 'disabled' : 'accent',
            }}
            active={{
              bg: !!ltvRatio && item >= ltvRatio ? 'disabled' : 'accentActive',
            }}
            bg={
              !!ltvRatio && item >= ltvRatio
                ? 'disabled'
                : +borrowLoan ===
                  +borrowCollateral * (item / 100) * currencyDiff
                ? 'background'
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

export default BorrowFormSelectLTV;
