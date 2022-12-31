import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { mergeDeepRight } from 'ramda';

import { NextPageWithAddress } from '@/interface';

const DynamicDEXPoolDetailsView = dynamic(
  () => import('../../../../views/dapp/views/dex-pool-details')
);

const DEXPoolDetailsPage: NextPageWithAddress = ({ address }) => (
  <DynamicDEXPoolDetailsView pairAddress={address} />
);

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, dexPoolPairMessages] = await Promise.all([
    import(`../../../../assets/messages/common/${locale}.json`),
    import(`../../../../assets/messages/dex/pool/details/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    dexPoolPairMessages.default
  );

  return {
    props: {
      messages,
      pageTitle: 'dexPoolPairAddress.pageTitle',
      now: Date.now(),
    },
  };
};

export default DEXPoolDetailsPage;
