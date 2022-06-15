import { NextPage } from 'next';
import { useRouter } from 'next/router';

import MAILMarketPool from '@/views/dapp/views/mail-market-pool';

const MAILMarketPoolPage: NextPage = () => {
  const {
    query: { pool },
  } = useRouter();

  return <MAILMarketPool pool={pool as string} />;
};

export default MAILMarketPoolPage;
