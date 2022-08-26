/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextPage } from 'next';

import Home from '@/views/home';

const HomePage: NextPage = () => <Home />;

export const getStaticProps = ({ locale, ...otherProps }: { locale: any }) => {
  return {
    props: {
      ...otherProps,
      messages: {
        ...require(`../assets/messages/index/${
          locale == 'en-US' ? 'en' : 'pt'
        }.json`),
        ...require(`../assets/messages/common/${
          locale == 'en-US' ? 'en' : 'pt'
        }.json`),
      },
    },
  };
};

export default HomePage;
