import { FC } from 'react';

import { Box } from '@/elements';
import { CHAIN_ID } from '@/sdk';

import { BorrowTable } from './components';
import Faucet from './components/faucet';
import Web3Manager from './web3-manager';

const DApp: FC = () => (
  <Web3Manager supportedChains={[CHAIN_ID.BNB_TEST_NET]}>
    <Box display="flex" flexDirection="column" height="100%">
      <BorrowTable />
      <Faucet />
    </Box>
  </Web3Manager>
);

export default DApp;
