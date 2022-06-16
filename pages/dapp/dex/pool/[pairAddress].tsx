import { NextPage } from 'next';
import { useRouter } from 'next/router';

import LiquidityPool from '@/views/dapp/views/dex-pool-details';

const DEXPoolDetailsPage: NextPage = () => {
  const {
    query: { pairAddress },
  } = useRouter();

  const pairAddressList = ((pairAddress as string)?.split('-') ?? ['', '']) as [
    string,
    string
  ];

  return <LiquidityPool tokens={pairAddressList} />;
};

export default DEXPoolDetailsPage;
