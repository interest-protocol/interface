import { FC } from 'react';

import { Box, Typography } from '@/elements';

const OutOfRange: FC = () => (
  <Box
    bg="warning"
    mx="M"
    p="M"
    height="2rem"
    width="7rem"
    borderRadius="0.5rem"
  >
    <Typography variant="normal" fontSize="0.8rem" textAlign="center">
      Out of range
    </Typography>
  </Box>
);

export default OutOfRange;
