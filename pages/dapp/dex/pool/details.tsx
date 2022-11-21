import { GetStaticProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import { withAddress } from '@/HOC';
import DEXPoolDetailsView from '@/views/dapp/views/dex-pool-details';

interface Props {
  address: string;
}

const DEXPoolDetailsPage: NextPage<Props> = ({ address }) => (
  <DEXPoolDetailsView pairAddress={address} />
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
      now: new Date().getTime(),
    },
  };
};

export default withAddress(DEXPoolDetailsPage);
