import { NextPage } from 'next';

import DEXPoolDetailsView from '@/views/dapp/views/dex-pool-details';

interface DEXPoolDetailsPageProps {
  pairAddress: string;
}

const DEXPoolDetailsPage: NextPage<DEXPoolDetailsPageProps> = ({
  pairAddress,
}) => <DEXPoolDetailsView pairAddress={pairAddress as string} />;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = ({
  params,
  locale,
}: {
  params: DEXPoolDetailsPageProps;
  locale: string;
}) => {
  const { pairAddress } = params;

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
