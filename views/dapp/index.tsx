import { FC } from 'react';

import { Box } from '@/elements';

import { BorrowTable } from './components';
import Faucet from './components/faucet';

const DApp: FC = () => (
  <Box display="flex" flexDirection="column" height="100%">
    <BorrowTable />
    <Faucet />
  </Box>
);

export default DApp;
