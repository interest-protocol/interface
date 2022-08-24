import { ethers } from 'ethers';
import { FC, useCallback, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { Box, Button, Typography } from '@/elements';
import { Fraction } from '@/sdk/entities/fraction';
import { IntMath } from '@/sdk/entities/int-math';

import {
  calculateBorrowAmount,
  calculateUserCurrentLTV,
} from '../../dinero-market.utils';
import { BorrowFormSelectLTVProps } from './borrow-form.types';

const LTV_ARRAY = [0, 25, 50, 75, 100];

const INITIAL_STATE = LTV_ARRAY.reduce(
  (acc, x) => ({ ...acc, [x]: false }),
  {} as Record<number, boolean>
);

const BorrowFormSelectLTV: FC<BorrowFormSelectLTVProps> = ({
  data,
  control,
  isBorrow,
  setValue,
}) => {
  const [selectedState, setSelected] = useState(INITIAL_STATE);

  const borrowCollateral = useWatch({
    control,
    name: 'borrow.collateral',
  });
  const borrowLoan = useWatch({
    control,
    name: 'borrow.loan',
  });

  const handleSetBorrowLoan = (intendedLTV: number) => {
    if (!data) return;
    setValue(
      'borrow.loan',
      calculateBorrowAmount({
        ...data,
        ltv: IntMath.toBigNumber(intendedLTV, 16),
        userCollateral: data.userCollateral.add(
          IntMath.toBigNumber(borrowCollateral)
        ),
      })
        .toNumber()
        .toString()
    );
  };

  const handleSetRepayLoan = (intendedLTV: number) => {
    if (!data) return;

    setValue(
      'repay.loan',
      intendedLTV === 100
        ? IntMath.from(data.dnrBalance).toNumber().toLocaleString('fullwide', {
            useGrouping: false,
            maximumSignificantDigits: 6,
          })
        : IntMath.from(data.dnrBalance)
            .mul(IntMath.toBigNumber(intendedLTV / 100))
            .toNumber()
            .toLocaleString('fullwide', {
              useGrouping: false,
              maximumSignificantDigits: 6,
            })
    );
  };

  const ltvRatio = useMemo(() => {
    if (data.ltv.isZero()) return 0;
    return (
      +Fraction.from(data.ltv, ethers.utils.parseEther('1')).toSignificant(4) *
      100
    );
  }, [data.ltv]);

  const isDisabled = useCallback(
    (item: number): boolean => {
      if (!isBorrow) return data.dnrBalance.isZero();

      const collateralBalance = data.collateralBalance.add(data.userCollateral);

      if (isBorrow && collateralBalance.isZero()) return true;

      if (item >= ltvRatio) return true;

      return calculateUserCurrentLTV(
        data,
        IntMath.toBigNumber(borrowCollateral),
        IntMath.toBigNumber(borrowLoan)
      ).gte(data.ltv);
    },
    [
      ltvRatio,
      isBorrow,
      data.dnrBalance.toString(),
      data.collateralBalance.toString(),
      data,
      borrowCollateral,
      borrowLoan,
    ]
  );

  return (
    <Box mt="XL">
      <Typography whiteSpace="pre-line" variant="normal" fontSize="S">
        {isBorrow
          ? 'Select a target LTV %'
          : `Select a DNR balance % to repay
            The contract will refund the difference`}
      </Typography>
      <Box display="flex" justifyContent="space-between" my="L">
        {LTV_ARRAY.map((item) => (
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
            onClick={() => {
              isBorrow ? handleSetBorrowLoan(item) : handleSetRepayLoan(item);

              setSelected({ ...INITIAL_STATE, [item]: true });
            }}
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
                : selectedState[item]
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
