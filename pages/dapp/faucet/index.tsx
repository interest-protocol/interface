import { NextPage } from 'next';

import { Web3Manager } from '@/components';
import { CHAIN_ID } from '@/sdk';
import Faucet from '@/views/dapp/views/faucet';

const FaucetPage: NextPage = () => (
  <Web3Manager supportedChains={[CHAIN_ID.RINKEBY]}>
    <Faucet />
  </Web3Manager>
);

export default FaucetPage;
