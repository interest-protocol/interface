import { NextPage } from 'next';
import { useRouter } from 'next/router';

import EarnPool from '@/views/dapp/views/earn-pool';

const EarnPoolPage: NextPage = () => {
  const {
    query: { poolAddress },
  } = useRouter();

  if (!poolAddress) return null;

  return <EarnPool address={poolAddress as string} />;
};

export default EarnPoolPage;
