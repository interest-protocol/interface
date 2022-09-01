import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Loading } from '@/views/dapp/components';
import DineroMarketMode from '@/views/dapp/views/dinero-market-panel';
import Error from '@/views/dapp/views/error';

const DineroMarketRepayPage: NextPage = () => {
  const { address } = useRouter().query;

  if (address === undefined) return <Loading />;

  if (address === null) return <Error message="Wrong params" />;

  return <DineroMarketMode address={address as string} mode="repay" />;
};

export default DineroMarketRepayPage;
