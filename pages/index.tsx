/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextPage } from 'next';

import { LOCALES, LocalesEnum } from '@/constants/locale';
import Home from '@/views/home';

const HomePage: NextPage = () => <Home />;

export const getStaticProps = ({
  locale = LocalesEnum.EN,
  ...otherProps
}: {
  locale: LocalesEnum;
}) => {
  return {
    props: {
      ...otherProps,
      messages: {
        ...require(`../assets/messages/index/${
          LOCALES[locale] || LOCALES[LocalesEnum.EN]
        }.json`),
        ...require(`../assets/messages/common/${
          LOCALES[locale] || LOCALES[LocalesEnum.EN]
        }.json`),
      },
    },
  };
};

export default HomePage;
