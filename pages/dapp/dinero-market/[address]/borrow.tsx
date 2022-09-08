import { NextPage } from 'next';

import { Loading } from '@/views/dapp/components';
import DineroMarketMode from '@/views/dapp/views/dinero-market-panel';
import Error from '@/views/dapp/views/error';

interface DineroMarketBorrowPageProps {
  address: string;
}

const DineroMarketBorrowPage: NextPage<DineroMarketBorrowPageProps> = ({
  address,
}) => {
  if (address === undefined) return <Loading />;

  if (address === null) return <Error message="Wrong params" />;

  return <DineroMarketMode address={address as string} mode="borrow" />;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = ({
  locale,
  params,
}: {
  params: DineroMarketBorrowPageProps;
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

export default DineroMarketBorrowPage;
