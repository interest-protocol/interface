import { GetStaticProps, NextPage } from 'next';

import MAILMarket from '@/views/dapp/views/mail-market';

const MAILMarketPage: NextPage = () => <MAILMarket />;

export const getStaticProps: GetStaticProps = ({ locale, ...otherProps }) => ({
  props: {
    ...otherProps,
    messages: {
      ...require(`../../../assets/messages/mail-market/${locale}.json`),
      ...require(`../../../assets/messages/common/${locale}.json`),
    },
  },
});

export default MAILMarketPage;
