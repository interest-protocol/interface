import { FC } from 'react';

import { Box } from '@/elements';

import { BorrowTable, Faucet } from './components';

const DApp: FC = () => (
  <Box display="flex" flexDirection="column" height="100%">
    <BorrowTable />
    <Faucet />
  </Box>
);

export default DApp;
