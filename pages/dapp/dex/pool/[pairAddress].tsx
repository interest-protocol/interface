import { NextPage } from 'next';
import { useRouter } from 'next/router';

import DEXPoolDetailsView from '@/views/dapp/views/dex-pool-details';

const DEXPoolDetailsPage: NextPage = () => {
  const {
    query: { pairAddress },
  } = useRouter();

  return <DEXPoolDetailsView pairAddress={pairAddress as string} />;
};

export default DEXPoolDetailsPage;
