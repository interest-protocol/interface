import { GetStaticProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import { withAddress } from '@/HOC';
import DineroMarketMode from '@/views/dapp/views/dinero-market-panel';

interface Props {
  address: string;
}

const DineroMarketBorrowPage: NextPage<Props> = ({ address }) => (
  <DineroMarketMode address={address} mode="borrow" />
);

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
      pageTitle: 'dineroMarketAddress.pageTitleBorrow',
    },
  };
};

export default withAddress(DineroMarketBorrowPage);
