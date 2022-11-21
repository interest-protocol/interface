import { GetStaticProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import { withAddress } from '@/components/HOC';
import DineroMarketMode from '@/views/dapp/views/dinero-market-panel';

interface Props {
  address: string;
}

const DineroMarketRepayPage: NextPage<Props> = ({ address }) => {
  return <DineroMarketMode address={address} mode="repay" />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, dineroMarketMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/dinero-market/address/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    dineroMarketMessages.default
  );

  return {
    props: {
      messages,
      now: new Date().getTime(),
      pageTitle: 'dineroMarketAddress.pageTitleRepay',
    },
  };
};

export default withAddress(DineroMarketRepayPage);
