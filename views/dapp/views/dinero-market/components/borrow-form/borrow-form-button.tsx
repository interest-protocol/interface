import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Box, Button } from '@/elements';

import { BorrowFormButtonProps } from './borrow-form.types';

const BorrowFormButton: FC<BorrowFormButtonProps> = ({ control, isBorrow }) => {
  const borrowLoan = useWatch({ control, name: 'borrow.loan' });
  const borrowCollateral = useWatch({ control, name: 'borrow.collateral' });
  const repayLoan = useWatch({ control, name: 'repay.loan' });
  const repayCollateral = useWatch({ control, name: 'repay.collateral' });

  return (
    <Box display="flex" justifyContent="center" mt="XXL">
      {isBorrow &&
        (!borrowLoan && !borrowCollateral ? (
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
          >
            {!!borrowLoan && !!borrowCollateral
              ? 'Add Collateral and Borrow'
              : borrowCollateral
              ? 'Add Collateral'
              : 'Borrow'}
          </Button>
        ))}
      {!isBorrow &&
        (!repayLoan && !repayCollateral ? (
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
          >
            {!!repayLoan && !!repayCollateral
              ? 'Remove Collateral and Repay Loan'
              : repayCollateral
              ? 'Remove Collateral'
              : 'Repay Loan'}
          </Button>
        ))}
    </Box>
  );
};

export default BorrowFormButton;
