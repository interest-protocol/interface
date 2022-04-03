import { ethers } from 'ethers';
import { FC, useCallback, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { Box, Button, Typography } from '@/elements';
import { Fraction } from '@/sdk/entities/fraction';
import { IntMath } from '@/sdk/entities/int-math';
import { calculateBorrowAmount } from '@/utils/dinero-market';

import { BorrowFormSelectLTVProps } from './borrow-form.types';

const BorrowFormSelectLTV: FC<BorrowFormSelectLTVProps> = ({
  data,
  control,
  isBorrow,
  setValue,
}) => {
  const repayLoan = useWatch({
    control,
    name: 'repay.loan',
  });
  const borrowCollateral = useWatch({
    control,
    name: 'borrow.collateral',
  });
  const borrowLoan = useWatch({
    control,
    name: 'borrow.loan',
  });

  const handleSetBorrowLoan = (intendedLTV: number) => () => {
    if (!data) return;

    setValue(
      'borrow.loan',
      calculateBorrowAmount({
        ...data.market,
        ltvRatio: IntMath.toBigNumber(intendedLTV, 16),
        userCollateral: data.market.userCollateral.add(
          IntMath.toBigNumber(borrowCollateral)
        ),
      })
        .toNumber()
        .toString()
    );
  };

  const handleSetRepayLoan = (intendedLTV: number) => () => {
    if (!data) return;

    setValue(
      'repay.loan',
      intendedLTV === 100
        ? IntMath.from(data.balances[1].numerator).toNumber().toString()
        : IntMath.from(data.balances[1].numerator)
            .mul(IntMath.toBigNumber(intendedLTV / 100))
            .toNumber()
            .toString()
    );
  };

  const ltvRatio = useMemo(() => {
    if (data.market.ltvRatio.isZero()) return 0;
    return (
      +Fraction.from(
        data.market.ltvRatio,
        ethers.utils.parseEther('1')
      ).toSignificant(4) * 100
    );
  }, [data.market.ltvRatio]);

  const isDisabled = useCallback(
    (item: number): boolean =>
      isBorrow ? !!ltvRatio && item >= ltvRatio : false,
    [ltvRatio]
  );

  const isSelected = useCallback(
    (intendedLTV: number): boolean =>
      isBorrow
        ? !!+borrowCollateral &&
          +borrowLoan ===
            calculateBorrowAmount({
              ...data.market,
              ltvRatio: IntMath.toBigNumber(intendedLTV, 16),
              userCollateral: data.market.userCollateral.add(
                IntMath.toBigNumber(borrowCollateral)
              ),
            }).toNumber()
        : !!+repayLoan &&
          +repayLoan ===
            (intendedLTV / 100) * IntMath.toNumber(data.balances[1].numerator),
    [borrowLoan, repayLoan, borrowCollateral]
  );

  return (
    <Box mt="XL">
      <Typography whiteSpace="pre-line" variant="normal" fontSize="S">
        {isBorrow
          ? 'Select a target LTV %'
          : `Select a DNR balance % to repay.
            The contract will refund the difference`}
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
            onClick={
              isBorrow ? handleSetBorrowLoan(item) : handleSetRepayLoan(item)
            }
            disabled={isDisabled(item)}
            cursor={isDisabled(item) ? 'not-allowed' : 'pointer'}
            hover={{
              bg: isDisabled(item) ? 'disabled' : 'accent',
            }}
            active={{
              bg: isDisabled(item) ? 'disabled' : 'accentActive',
            }}
            bg={
              isDisabled(item)
                ? 'disabled'
                : isSelected(item)
                ? 'accentActive'
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
