import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Web3Manager } from '@/components';
import { CHAIN_ID } from '@/sdk';
import MAILMarketPool from '@/views/dapp/views/mail-market-pool';

const MAILMarketPoolPage: NextPage = () => {
  const {
    query: { pool },
  } = useRouter();

  return (
    <Web3Manager supportedChains={[CHAIN_ID.RINKEBY]}>
      <MAILMarketPool pool={pool as string} />
    </Web3Manager>
  );
};

export default MAILMarketPoolPage;
