import { FC } from 'react';

import { Box, Typography } from '@/elements';

import { SwapMessageProps } from './swap.types';

const SwapMessage: FC<SwapMessageProps> = ({ color, Icon, message }) => (
  <Box
    p="L"
    my="M"
    display="flex"
    bg="background"
    borderRadius="M"
    alignItems="center"
    color={color ?? 'text'}
  >
    <Box mr={['L', 'M']}>
      <Icon width="1.2rem" />
    </Box>
    <Typography
      fontSize="S"
      variant="normal"
      maxWidth="40rem"
      overflow="hidden"
    >
      {message}
    </Typography>
  </Box>
);

export default SwapMessage;
