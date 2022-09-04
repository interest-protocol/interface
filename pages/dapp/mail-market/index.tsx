import { GetStaticProps, NextPage } from 'next';

import { LOCALES, LocalesEnum } from '@/constants/locale';
import MAILMarket from '@/views/dapp/views/mail-market';

const MAILMarketPage: NextPage = () => <MAILMarket />;

export const getStaticProps: GetStaticProps = ({ locale, ...otherProps }) => ({
  props: {
    ...otherProps,
    messages: {
      ...require(`../../../assets/messages/mail-market/${
        LOCALES[(locale as LocalesEnum) || LocalesEnum.EN]
      }.json`),
      ...require(`../../../assets/messages/common/${
        LOCALES[(locale as LocalesEnum) || LocalesEnum.EN]
      }.json`),
    },
  },
});

export default MAILMarketPage;
