import { GetServerSideProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import DineroMarket from '@/views/dapp/views/dinero-market';

const DineroMarketPage: NextPage = () => <DineroMarket />;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const [commonMessages, dineroMarketMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/dinero-market/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    dineroMarketMessages.default
  );

  return {
    props: {
      messages,
      now: new Date().getTime(),
      pageTitle: 'dineroMarket.pageTitle',
    },
  };
};

export default DineroMarketPage;
