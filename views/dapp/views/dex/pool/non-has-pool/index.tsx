import { FC } from 'react';

import { Box, Typography } from '@/elements';
import { BagSVG } from '@/svg';

const NonHasPool: FC = () => (
  <>
    <Box width="3rem" minHeight="3rem" mx="auto">
      <BagSVG />
    </Box>
    <Typography
      as="p"
      variant="normal"
      color="textSecondary"
      textAlign="center"
      mt="M"
    >
      Your liquidity pools will appear here.
    </Typography>
  </>
);
export default NonHasPool;
