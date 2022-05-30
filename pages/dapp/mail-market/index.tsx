import { NextPage } from 'next';

import { Web3Manager } from '@/components';
import { CHAIN_ID } from '@/sdk';
import MAILMarket from '@/views/dapp/views/mail-market';

const MAILMarketPage: NextPage = () => (
  <Web3Manager supportedChains={[CHAIN_ID.RINKEBY]}>
    <MAILMarket />
  </Web3Manager>
);

export default MAILMarketPage;
