import { GetServerSideProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import Home from '@/views/home';

const HomePage: NextPage = () => <Home />;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const [commonMessages, landingPageMessages] = await Promise.all([
    import(`../assets/messages/common/${locale}.json`),
    import(`../assets/messages/landing-page/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    landingPageMessages.default
  );

  return {
    props: {
      messages,
      now: new Date().getTime(),
      pageTitle: 'landingPage.pageTitle',
    },
  };
};

export default HomePage;
