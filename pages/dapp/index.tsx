import { NextPage } from 'next';

import Web3Manager from '../../components/web3-manager';
import DApp from '../../views/dapp';

const App: NextPage = () => (
  <Web3Manager>
    <DApp />
  </Web3Manager>
);

export default App;
