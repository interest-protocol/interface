import { GetStaticProps, NextPage } from 'next';

import { LOCALES, LocalesEnum } from '@/constants/locale';
import DEXView from '@/views/dapp/views/dex';

const DEXPoolPage: NextPage = () => <DEXView />;

export const getStaticProps: GetStaticProps = ({ locale, ...otherProps }) => ({
  props: {
    ...otherProps,
    messages: {
      ...require(`../../../../assets/messages/dex/pool/${
        LOCALES[(locale as LocalesEnum) || LocalesEnum.EN]
      }.json`),
      ...require(`../../../../assets/messages/common/${
        LOCALES[(locale as LocalesEnum) || LocalesEnum.EN]
      }.json`),
    },
  },
});

export default DEXPoolPage;
