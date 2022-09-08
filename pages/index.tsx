import { GetStaticProps, NextPage } from 'next';

import Home from '@/views/home';

const HomePage: NextPage = () => <Home />;

export const getStaticProps: GetStaticProps = ({ locale, ...otherProps }) => ({
  props: {
    ...otherProps,
    messages: {
      ...require(`../assets/messages/index/${locale}.json`),
      ...require(`../assets/messages/common/${locale}.json`),
    },
  },
});

export default HomePage;
