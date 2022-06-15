import { NextPage } from 'next';
import { useRouter } from 'next/router';

import LiquidityPool from '@/views/dapp/views/dex-pool-details';

const DEXPoolDetailsPage: NextPage = () => {
  const {
    query: { tokens },
  } = useRouter();

  return (
    <LiquidityPool
      tokens={[(tokens?.[0] as string) ?? '', (tokens?.[1] as string) ?? '']}
    />
  );
};

export default DEXPoolDetailsPage;
