import { GetServerSideProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

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

  const [commonMessages, dexPoolPairMessages] = await Promise.all([
    import(`../../../../assets/messages/common/${locale}.json`),
    import(`../../../../assets/messages/dex/pool/pair-address/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    dexPoolPairMessages.default
  );

  return {
    props: {
      pairAddress,
      messages,
      pageTitle: 'dexPoolPairAddress.pageTitle',
      now: new Date().getTime(),
    },
  };
};

export default DEXPoolDetailsPage;
