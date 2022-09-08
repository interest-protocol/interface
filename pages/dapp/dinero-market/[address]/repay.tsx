import { NextPage } from 'next';

import { Loading } from '@/views/dapp/components';
import DineroMarketMode from '@/views/dapp/views/dinero-market-panel';
import Error from '@/views/dapp/views/error';

interface DineroMarketRepayPageProps {
  address: string;
}

const DineroMarketRepayPage: NextPage<DineroMarketRepayPageProps> = ({
  address,
}) => {
  if (address === undefined) return <Loading />;

  if (address === null) return <Error message="Wrong params" />;

  return <DineroMarketMode address={address as string} mode="repay" />;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = ({
  locale,
  params,
}: {
  params: DineroMarketRepayPageProps;
  locale: string;
}) => {
  const { address } = params;

  return {
    props: {
      address,
      messages: {
        ...require(`../../../../assets/messages/dinero-market/address/${locale}.json`),
        ...require(`../../../../assets/messages/common/${locale}.json`),
      },
    },
  };
};

export default DineroMarketRepayPage;
