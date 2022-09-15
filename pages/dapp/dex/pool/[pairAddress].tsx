import { GetServerSideProps, NextPage } from 'next';

import DEXPoolDetailsView from '@/views/dapp/views/dex-pool-details';

interface DEXPoolDetailsPageProps {
  pairAddress: string;
}

const DEXPoolDetailsPage: NextPage<DEXPoolDetailsPageProps> = ({
  pairAddress,
}) => <DEXPoolDetailsView pairAddress={pairAddress} />;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}) => {
  const { pairAddress } = params || {};

  return {
    props: {
      pairAddress,
      messages: {
        ...require(`../../../../assets/messages/dex/pool/pair-address/${locale}.json`),
        ...require(`../../../../assets/messages/common/${locale}.json`),
      },
    },
  };
};

export default DEXPoolDetailsPage;
