import { GetStaticProps, NextPage } from 'next';

import { LOCALES, LocalesEnum } from '@/constants/locale';
import Home from '@/views/home';

const HomePage: NextPage = () => <Home />;

export const getStaticProps: GetStaticProps = ({ locale, ...otherProps }) => ({
  props: {
    ...otherProps,
    messages: {
      ...require(`../assets/messages/index/${
        LOCALES[(locale as LocalesEnum) || LocalesEnum.EN]
      }.json`),
      ...require(`../assets/messages/common/${
        LOCALES[(locale as LocalesEnum) || LocalesEnum.EN]
      }.json`),
    },
  },
});

export default HomePage;
