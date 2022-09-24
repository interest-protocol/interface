import { GetStaticProps, NextPage } from 'next';

import Home from '@/views/home';

const HomePage: NextPage = () => <Home />;

export const getStaticProps: GetStaticProps = async ({
  locale,
  ...otherProps
}) => ({
  props: {
    ...otherProps,
    messages: {
      ...require(`../assets/messages/landing-page/${locale}.json`),
      ...require(`../assets/messages/common/${locale}.json`),
    },
    pageTitle: 'landingPage.pageTitle',
  },
});

export default HomePage;
