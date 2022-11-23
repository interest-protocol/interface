import { GetStaticProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import { withParamsGuard } from '@/HOC';
import SyntheticsMarketMode from '@/views/dapp/views/synthetics-market-panel';

interface Props {
  address: string;
  oracle?: 'redstone';
}

const SyntheticsBurnPage: NextPage<Props> = ({ address, oracle }) => (
  <SyntheticsMarketMode
    mode="burn"
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
      pageTitle: 'syntheticsMarketAddress.burn.pageTitle',
    },
  };
};

export default withParamsGuard(['address', 'oracle'], SyntheticsBurnPage);
