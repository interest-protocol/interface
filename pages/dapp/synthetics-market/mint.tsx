import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { mergeDeepRight } from 'ramda';

import { withAddressGuard } from '@/HOC';
import { NextPageWithAddress } from '@/interface';

const DynamicSyntheticsMarketMode = dynamic(
  () => import('../../../views/dapp/views/synthetics-market-panel')
);

const SyntheticsMintPage: NextPageWithAddress = ({ address }) => (
  <DynamicSyntheticsMarketMode address={address} mode="mint" />
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
