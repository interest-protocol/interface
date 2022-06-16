import { NextPage } from 'next';
import { useRouter } from 'next/router';

import LiquidityPool from '@/views/dapp/views/dex-pool-details';

const DEXPoolDetailsPage: NextPage = () => {
  const {
    query: { tokens },
  } = useRouter();

  const tokenPair = (tokens as string)?.split('-') ?? ['', ''];

  return <LiquidityPool tokens={tokenPair as [string, string]} />;
};

export default DEXPoolDetailsPage;
