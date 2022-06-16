import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { TOKEN_SYMBOL } from '@/sdk';
import Loading from '@/views/dapp/components/loading';
import DineroMarket from '@/views/dapp/views/dinero-market';
import Error from '@/views/dapp/views/error';

const DineroMarketPage: NextPage = () => {
  const { mode, currency } = useRouter().query;

  if (currency === undefined && mode === undefined) return <Loading />;

  if (currency === null || mode === null)
    return <Error message="Wrong params" />;

  return (
    <DineroMarket
      tokenSymbol={currency as TOKEN_SYMBOL}
      mode={mode as 'borrow' | 'repay'}
    />
  );
};

export default DineroMarketPage;
