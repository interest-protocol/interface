import { NextPage } from 'next';

import DEXPoolDetailsView from '@/views/dapp/views/dex-pool-details';
import { RedirectLang } from '@/views/home/components';

const DEXPoolDetailsPage: NextPage<{ pairAddress: any }> = ({
  pairAddress,
}) => {
  return (
    <>
      <RedirectLang />
      <DEXPoolDetailsView pairAddress={pairAddress as string} />
    </>
  );
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
          context.locale == 'en-US'
            ? 'en'
            : context.locale == 'pt-PT'
            ? 'pt'
            : 'br'
        }.json`),
        ...require(`../../../../assets/messages/common/${
          context.locale == 'en-US'
            ? 'en'
            : context.locale == 'pt-PT'
            ? 'pt'
            : 'br'
        }.json`),
      },
    },
  };
};

export default DEXPoolDetailsPage;
