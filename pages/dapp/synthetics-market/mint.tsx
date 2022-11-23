import { GetStaticProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import { withParamsGuard } from '@/HOC';
import SyntheticsMarketMode from '@/views/dapp/views/synthetics-market-panel';

interface Props {
  address: string;
  oracle?: 'redstone';
}

const SyntheticsMintPage: NextPage<Props> = ({ address, oracle }) => (
  <SyntheticsMarketMode
    mode="mint"
    address={address}
    redStone={oracle === 'redstone'}
  />
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

export default withParamsGuard(['address', 'oracle'], SyntheticsMintPage);
