/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextPage } from 'next';

import Home from '@/views/home';

const HomePage: NextPage = () => <Home />;

export const getStaticProps = (props: any) => {
  return {
    props: {
      messages: {
        ...require(`../assets/index/${props.locale}.json`),
      },
    },
  };
};

export default HomePage;
