import { GetStaticProps } from 'next';
import { mergeDeepRight } from 'ramda';

import { withAddressGuard } from '@/HOC';
import { NextPageWithAddress } from '@/interface';
import DineroMarketMode from '@/views/dapp/views/dinero-market-panel';

const DineroMarketRepayPage: NextPageWithAddress = ({ address }) => {
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
      now: Date.now(),
      pageTitle: 'dineroMarketAddress.pageTitleRepay',
    },
  };
};

export default withAddressGuard(DineroMarketRepayPage);
