import { FC } from 'react';

import { Box } from '@/elements';
import { LoadingSVG } from '@/svg';

const Loading: FC = () => (
  <Box mx="auto" width="3rem" height="100%" display="flex" alignItems="center">
    <LoadingSVG width="100%" height="100%" />
  </Box>
);

export default Loading;
