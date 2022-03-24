import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Borrow from '@/views/dapp/views/borrow';

const BorrowPage: NextPage = () => {
  const {
    query: { currency, mode },
  } = useRouter();

  if (!currency || !mode) return <>Wrong Route</>;

  return (
    <Borrow currency={currency as string} mode={mode as 'borrow' | 'repay'} />
  );
};

export default BorrowPage;
