import { ethers } from 'ethers';
import { FC, useEffect } from 'react';
import { useWatch } from 'react-hook-form';

import { Box, Button, Typography } from '@/elements';
import { IntMath } from '@/sdk/entities/int-math';
import { LoadingSVG } from '@/svg';
import { convertCollateralToDinero } from '@/utils/dinero-market';

import { BorrowFormButtonProps } from './borrow-form.types';

const { parseEther } = ethers.utils;

const BorrowFormButton: FC<BorrowFormButtonProps> = ({
  data,
  errors,
  control,
  isBorrow,
  setError,
  onSubmit,
  clearErrors,
  isSubmitting,
  handleAddAllowance,
}) => {
  const repayLoan = useWatch({ control, name: 'repay.loan' });
  const borrowLoan = useWatch({ control, name: 'borrow.loan' });
  const repayCollateral = useWatch({ control, name: 'repay.collateral' });
  const borrowCollateral = useWatch({ control, name: 'borrow.collateral' });

  useEffect(() => {
    if (
      errors.borrow?.loan?.type !== 'max' &&
      borrowLoan &&
      parseEther(borrowLoan).gt(
        convertCollateralToDinero(
          data.market.userCollateral.add(IntMath.toBigNumber(borrowCollateral)),
          data.market.ltvRatio,
          data.market.exchangeRate
        )
      )
    )
      setError('borrow.loan', {
        type: 'max',
        message: 'The Loan must to be less than LTV',
      });

    if (
      errors.borrow?.loan?.type === 'max' &&
      borrowLoan &&
      convertCollateralToDinero(
        data.market.userCollateral,
        data.market.ltvRatio,
        data.market.exchangeRate
      ).gte(parseEther(borrowLoan))
    )
      clearErrors('borrow.loan');

    if (
      errors.borrow?.collateral?.type !== 'max' &&
      borrowCollateral &&
      parseEther(borrowCollateral).gt(data.balances[0].numerator)
    )
      setError('borrow.collateral', {
        type: 'max',
        message: 'The Collateral must not to be more than your balance',
      });

    if (
      errors.borrow?.collateral?.type === 'max' &&
      borrowCollateral &&
      +borrowCollateral <= IntMath.toNumber(data.balances[0].numerator)
    )
      clearErrors('borrow.collateral');
  }, [borrowLoan, borrowCollateral]);

  return (
    <Box display="flex" justifyContent="center" mt="XXL">
      {isBorrow ? (
        data.market.allowance.isZero() ? (
          <Button
            display="flex"
            variant="primary"
            alignItems="center"
            cursor="not-allowed"
            disabled={isSubmitting}
            justifyContent="center"
            onClick={handleAddAllowance}
            hover={{ bg: 'accentActive' }}
            bg={isSubmitting ? 'accentActive' : 'accent'}
          >
            {isSubmitting && <LoadingSVG width="1rem" />}
            <Typography
              as="span"
              variant="normal"
              ml={isSubmitting ? 'L' : 'NONE'}
            >
              Approve
            </Typography>
          </Button>
        ) : (!borrowLoan && !borrowCollateral) ||
          (+borrowCollateral === 0 && +borrowLoan === 0) ? (
          <Box
            py="L"
            px="XL"
            fontSize="S"
            bg="disabled"
            borderRadius="M"
            cursor="not-allowed"
          >
            No Request
          </Box>
        ) : (
          <Button
            type="submit"
            variant="primary"
            onClick={onSubmit}
            cursor="not-allowed"
            disabled={isSubmitting}
            hover={{ bg: 'accentActive' }}
            bg={isSubmitting ? 'accentActive' : 'accent'}
          >
            {isSubmitting && <LoadingSVG width="1rem" />}
            <Typography
              as="span"
              variant="normal"
              ml={isSubmitting ? 'L' : 'NONE'}
            >
              {!!borrowLoan && !!borrowCollateral
                ? 'Add Collateral and Borrow'
                : +borrowCollateral > 0
                ? 'Add Collateral'
                : 'Borrow'}
            </Typography>
          </Button>
        )
      ) : data.market.allowance.isZero() ? (
        <Button
          display="flex"
          variant="primary"
          alignItems="center"
          cursor="not-allowed"
          disabled={isSubmitting}
          justifyContent="center"
          onClick={handleAddAllowance}
          hover={{ bg: 'accentActive' }}
          bg={isSubmitting ? 'accentActive' : 'accent'}
        >
          {isSubmitting && <LoadingSVG width="1rem" />}
          <Typography
            as="span"
            variant="normal"
            ml={isSubmitting ? 'L' : 'NONE'}
          >
            Approve
          </Typography>
        </Button>
      ) : !repayLoan && !repayCollateral ? (
        <Box
          py="L"
          px="XL"
          fontSize="S"
          bg="disabled"
          borderRadius="M"
          cursor="not-allowed"
        >
          No Request
        </Box>
      ) : (
        <Button
          type="submit"
          variant="primary"
          onClick={onSubmit}
          cursor="not-allowed"
          disabled={isSubmitting}
          hover={{ bg: 'accentActive' }}
          bg={isSubmitting ? 'accentActive' : 'accent'}
        >
          {isSubmitting && <LoadingSVG width="1rem" />}
          <Typography
            as="span"
            variant="normal"
            ml={isSubmitting ? 'L' : 'NONE'}
          >
            {!!repayLoan && !!repayCollateral
              ? 'Remove Collateral and Repay Loan'
              : repayCollateral
              ? 'Remove Collateral'
              : 'Repay Loan'}
          </Typography>
        </Button>
      )}
    </Box>
  );
};

export default BorrowFormButton;
