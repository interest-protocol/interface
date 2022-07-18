import { FC } from 'react';

import { Box, Typography } from '@/elements';
import { LoadingSVG } from '@/svg';

import { SwapFetchingAmountProps } from './swap.types';

const SwapFetchingAmount: FC<SwapFetchingAmountProps> = ({ fetching }) =>
  fetching ? (
    <Box
      p="L"
      my="M"
      display="flex"
      bg="background"
      borderRadius="M"
      alignItems="center"
    >
      <Box mr="M">
        <LoadingSVG width="1rem" />
      </Box>
      <Typography variant="normal" fontSize="S">
        Fetching amount...
      </Typography>
    </Box>
  ) : null;

export default SwapFetchingAmount;
