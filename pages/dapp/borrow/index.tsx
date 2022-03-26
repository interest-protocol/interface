import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Borrow from '@/views/dapp/views/borrow';
import Error from '@/views/dapp/views/error';
import Loading from '@/views/dapp/views/loading';

const BorrowPage: NextPage = () => {
  const { mode, currency } = useRouter().query;

  if (currency === undefined && mode === undefined) return <Loading />;

  if (currency === null || mode === null)
    return <Error message="Wrong params" />;

  return (
    <Borrow currency={currency as string} mode={mode as 'borrow' | 'repay'} />
  );
};

export default BorrowPage;
