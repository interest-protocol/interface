import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { mergeDeepRight } from 'ramda';

import { withAddressGuard } from '@/HOC';
import { NextPageWithAddress } from '@/interface';

const DynamicDineroMarketMode = dynamic(
  () => import('../../../views/dapp/views/dinero-market-panel')
);

const DineroMarketRepayPage: NextPageWithAddress = ({ address }) => {
  return <DynamicDineroMarketMode address={address} mode="repay" />;
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
