import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { TOKEN_SYMBOL } from '@/sdk';
import { Layout } from '@/views/dapp/components';
import DineroMarket from '@/views/dapp/views/dinero-market';
import Error from '@/views/dapp/views/error';
import Loading from '@/views/dapp/views/loading';

const DineroMarketPage: NextPage = () => {
  const { currency } = useRouter().query;

  if (currency === undefined) return <Loading />;

  if (currency === null)
    return (
      <Layout pageTitle="dapp">
        <Error message="Wrong params" />
      </Layout>
    );

  return <DineroMarket tokenSymbol={currency as TOKEN_SYMBOL} mode="repay" />;
};

export default DineroMarketPage;
