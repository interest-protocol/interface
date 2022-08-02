import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { TOKEN_SYMBOL } from '@/sdk';
import { Loading } from '@/views/dapp/components';
import DineroMarketMode from '@/views/dapp/views/dinero-market-mode';
import Error from '@/views/dapp/views/error';

const DineroMarketBorrowPage: NextPage = () => {
  const { mode, currency } = useRouter().query;

  if (currency === undefined && mode === undefined) return <Loading />;

  if (currency === null || mode === null)
    return <Error message="Wrong params" />;

  return (
    <DineroMarketMode tokenSymbol={currency as TOKEN_SYMBOL} mode="borrow" />
  );
};

export default DineroMarketBorrowPage;
