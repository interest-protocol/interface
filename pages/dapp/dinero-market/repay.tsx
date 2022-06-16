import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { TOKEN_SYMBOL } from '@/sdk';
import { Loading } from '@/views/dapp/components';
import DineroMarketMode from '@/views/dapp/views/dinero-market-mode';
import Error from '@/views/dapp/views/error';

const DineroMarketRepayPage: NextPage = () => {
  const { currency } = useRouter().query;

  if (currency === undefined) return <Loading />;

  if (currency === null) return <Error message="Wrong params" />;

  return (
    <DineroMarketMode tokenSymbol={currency as TOKEN_SYMBOL} mode="repay" />
  );
};

export default DineroMarketRepayPage;
