import { NextPage } from 'next';

import { Web3Manager } from '@/components';
import { CHAIN_ID } from '@/sdk';
import DApp from '@/views/dapp';

const App: NextPage = () => (
  <Web3Manager supportedChains={[CHAIN_ID.BNB_TEST_NET, CHAIN_ID.BNB_MAIN_MET]}>
    <DApp />
  </Web3Manager>
);

export default App;
