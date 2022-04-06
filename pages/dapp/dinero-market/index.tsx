import { NextPage } from 'next';
import { useRouter } from 'next/router';

import DineroMarket from '@/views/dapp/views/dinero-market';
import Error from '@/views/dapp/views/error';
import Loading from '@/views/dapp/views/loading';

const DineroMarketPage: NextPage = () => {
  const { mode, currency } = useRouter().query;

  if (currency === undefined && mode === undefined) return <Loading />;

  if (currency === null || mode === null)
    return <Error message="Wrong params" />;

  return (
    <DineroMarket
      currency={currency as string}
      mode={mode as 'borrow' | 'repay'}
    />
  );
};

export default DineroMarketPage;
