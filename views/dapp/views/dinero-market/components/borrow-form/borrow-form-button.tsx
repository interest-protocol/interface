import { FC, useEffect } from 'react';
import { useWatch } from 'react-hook-form';

import { Box, Button } from '@/elements';

import { BorrowFormButtonProps } from './borrow-form.types';

const BorrowFormButton: FC<BorrowFormButtonProps> = ({
  errors,
  control,
  isBorrow,
  ltvRatio,
  setError,
  onSubmit,
  allowance,
  clearErrors,
  currencyDiff,
  currencyAmount,
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
      ltvRatio &&
      +borrowLoan > (ltvRatio / 100) * (+borrowCollateral * currencyDiff)
    )
      setError('borrow.loan', {
        type: 'max',
        message: 'The Loan must to be less than LTV',
      });

    if (
      errors.borrow?.loan?.type === 'max' &&
      borrowLoan &&
      ltvRatio &&
      +borrowLoan <= (ltvRatio / 100) * (+borrowCollateral * currencyDiff)
    )
      clearErrors('borrow.loan');
  }, [borrowLoan, borrowCollateral]);

  useEffect(() => {
    if (
      errors.borrow?.collateral?.type !== 'max' &&
      borrowCollateral &&
      +borrowCollateral > currencyAmount
    )
      setError('borrow.collateral', {
        type: 'max',
        message: 'The Collateral must not to be more than your balance',
      });

    if (
      errors.borrow?.loan?.type === 'max' &&
      borrowCollateral &&
      +borrowCollateral <= currencyAmount
    )
      clearErrors('borrow.collateral');
  }, [borrowLoan, borrowCollateral]);

  return (
    <Box display="flex" justifyContent="center" mt="XXL">
      {isBorrow ? (
        allowance.isZero() ? (
          <Button
            variant="primary"
            onClick={handleAddAllowance}
            hover={{ bg: 'accentActive' }}
          >
            Approve
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
            hover={{ bg: 'accentActive' }}
            onClick={onSubmit}
          >
            {!!borrowLoan && !!borrowCollateral
              ? 'Add Collateral and Borrow'
              : +borrowCollateral > 0
              ? 'Add Collateral'
              : 'Borrow'}
          </Button>
        )
      ) : allowance.isZero() ? (
        <Button
          variant="primary"
          onClick={handleAddAllowance}
          hover={{ bg: 'accentActive' }}
        >
          Approve
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
          hover={{ bg: 'accentActive' }}
          onClick={onSubmit}
        >
          {!!repayLoan && !!repayCollateral
            ? 'Remove Collateral and Repay Loan'
            : repayCollateral
            ? 'Remove Collateral'
            : 'Repay Loan'}
        </Button>
      )}
    </Box>
  );
};

export default BorrowFormButton;
