import { FC } from 'react';

import { Box, Button } from '@/elements';

import { BorrowFormButtonProps } from './borrow-form.types';

const BorrowFormButton: FC<BorrowFormButtonProps> = ({
  isBorrow,
  watch,
  buttonText,
}) => (
  <Box display="flex" justifyContent="center" mt="XXL">
    {(isBorrow && !watch('borrow.loan') && !watch('borrow.collateral')) ||
    (!isBorrow && !watch('repay.loan') && !watch('repay.collateral')) ? (
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
      <Button type="submit" variant="primary" hover={{ bg: 'accentActive' }}>
        {buttonText}
      </Button>
    )}
  </Box>
);

export default BorrowFormButton;
