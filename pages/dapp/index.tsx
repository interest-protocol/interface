import { Web3Manager } from '@components';
import DApp from '@views/dapp';
import { NextPage } from 'next';

const App: NextPage = () => (
  <Web3Manager>
    <DApp />
  </Web3Manager>
);

export default App;
