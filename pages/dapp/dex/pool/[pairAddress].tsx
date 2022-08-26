import { NextPage } from 'next';

import DEXPoolDetailsView from '@/views/dapp/views/dex-pool-details';

const DEXPoolDetailsPage: NextPage<{ pairAddress: any }> = ({
  pairAddress,
}) => {
  return <DEXPoolDetailsView pairAddress={pairAddress as string} />;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = (context: {
  params: any;
  locale: string;
}) => {
  const { params } = context;
  const pairAddress = params.pairAddress;
  return {
    props: {
      pairAddress: pairAddress,
      messages: {
        ...require(`../../../../assets/messages/dex/pool/pair-address/${
          context.locale == 'en-US' ? 'en' : 'pt'
        }.json`),
        ...require(`../../../../assets/messages/common/${
          context.locale == 'en-US' ? 'en' : 'pt'
        }.json`),
      },
    },
  };
};

export default DEXPoolDetailsPage;
