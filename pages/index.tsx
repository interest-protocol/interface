/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextPage } from 'next';

import Home from '@/views/home';
import { RedirectLang } from '@/views/home/components';

const HomePage: NextPage = () => (
  <>
    <RedirectLang />
    <Home />
  </>
);

export const getStaticProps = ({ locale, ...otherProps }: { locale: any }) => {
  return {
    props: {
      ...otherProps,
      messages: {
        ...require(`../assets/messages/index/${
          locale == 'en-US' ? 'en' : locale == 'pt-PT' ? 'pt' : 'br'
        }.json`),
        ...require(`../assets/messages/common/${
          locale == 'en-US' ? 'en' : locale == 'pt-PT' ? 'pt' : 'br'
        }.json`),
      },
    },
  };
};

export default HomePage;
