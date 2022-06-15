import { FC } from 'react';

import { Box, Typography } from '@/elements';

const OutOfRange: FC = () => (
  <Box p="M" bg="warning" borderRadius="0.5rem">
    <Typography variant="normal" fontSize="0.8rem" textAlign="center">
      Out of range
    </Typography>
  </Box>
);

export default OutOfRange;
