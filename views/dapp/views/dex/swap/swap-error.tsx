import { FC } from 'react';

import { Box, Typography } from '@/elements';

import { SwapErrorMessageProps } from './swap.types';

const SwapErrorMessage: FC<SwapErrorMessageProps> = ({ errorMessage }) =>
  errorMessage ? (
    <Box
      p="L"
      my="M"
      color="error"
      display="flex"
      bg="background"
      borderRadius="M"
      alignItems="center"
    >
      <Box
        mr="M"
        width="1.2rem"
        height="1.2rem"
        display="flex"
        borderRadius="50%"
        border="1px solid"
        alignItems="center"
        justifyContent="center"
      >
        !
      </Box>
      <Typography variant="normal" fontSize="S">
        {errorMessage}
      </Typography>
    </Box>
  ) : null;

export default SwapErrorMessage;
