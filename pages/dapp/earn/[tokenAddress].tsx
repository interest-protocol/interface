import { NextPage } from 'next';
import { useRouter } from 'next/router';

import EarnFarm from '@/views/dapp/views/earn-farm';

const EarnFarmPage: NextPage = () => {
  const {
    query: { tokenAddress },
  } = useRouter();

  if (!tokenAddress) return null;

  return <EarnFarm address={tokenAddress as string} />;
};

export default EarnFarmPage;
