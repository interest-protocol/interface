/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Home from '@/views/home';

const HomePage: NextPage = () => {
  const { locale } = useRouter();

  return <Home />;
};

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
