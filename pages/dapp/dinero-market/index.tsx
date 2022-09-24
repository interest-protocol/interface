import { GetStaticProps, NextPage } from 'next';

import DineroMarket from '@/views/dapp/views/dinero-market';

const DineroMarketPage: NextPage = () => <DineroMarket />;

export const getStaticProps: GetStaticProps = async ({
  locale,
  ...otherProps
}) => ({
  props: {
    ...otherProps,
    messages: {
      ...require(`../../../assets/messages/dinero-market/${locale}.json`),
      ...require(`../../../assets/messages/common/${locale}.json`),
    },
    pageTitle: 'dineroMarket.pageTitle',
  },
});

export default DineroMarketPage;
