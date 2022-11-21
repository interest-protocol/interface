import { GetStaticProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import { withAddress } from '@/HOC';
import SyntheticsMarketMode from '@/views/dapp/views/synthetics-market-panel';

interface Props {
  address: string;
}

const SyntheticsMintPage: NextPage<Props> = ({ address }) => (
  <SyntheticsMarketMode address={address} mode="mint" />
);

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, syntheticMarketMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/synthetics-market/address/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    syntheticMarketMessages.default
  );

  return {
    props: {
      messages,
      now: new Date().getTime(),
      pageTitle: 'syntheticsMarketAddress.mint.pageTitle',
    },
  };
};

export default withAddress(SyntheticsMintPage);
