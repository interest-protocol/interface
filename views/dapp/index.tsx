import { FC } from 'react';

import { Box } from '@/elements';

import { BorrowTable } from './components';
import Faucet from './components/faucet';
import Web3Manager from './web3-manager';

const DApp: FC = () => (
  <Web3Manager>
    <Box display="flex" flexDirection="column" height="100%">
      <BorrowTable />
      <Faucet />
    </Box>
  </Web3Manager>
);

export default DApp;
