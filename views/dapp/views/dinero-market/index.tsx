import { FC } from 'react';

import { Box } from '@/elements';

import { BorrowTable } from '../../components';

const DApp: FC = () => (
  <Box display="flex" flexDirection="column" height="100%">
    <BorrowTable />
  </Box>
);

export default DApp;
