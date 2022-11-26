import { GetStaticProps } from 'next';
import { mergeDeepRight } from 'ramda';

import { withAddressGuard } from '@/HOC';
import { NextPageWithAddress } from '@/interface';
import SyntheticsMarketMode from '@/views/dapp/views/synthetics-market-panel';

const SyntheticsMintPage: NextPageWithAddress = ({ address }) => (
  <SyntheticsMarketMode mode="mint" address={address} />
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
      now: Date.now(),
      pageTitle: 'syntheticsMarketAddress.mint.pageTitle',
    },
  };
};

export default withAddressGuard(SyntheticsMintPage);
