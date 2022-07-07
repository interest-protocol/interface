import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Earn from '@/views/dapp/views/earn';

const EarnPage: NextPage = () => {
  const {
    query: { type },
  } = useRouter();

  return <Earn type={type as string} />;
};

export default EarnPage;
