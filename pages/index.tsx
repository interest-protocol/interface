import { GetStaticProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import Home from '@/views/home';

const HomePage: NextPage = () => <Home />;

export const getStaticProps: GetStaticProps = async ({
  locale,
  ...otherProps
}) => {
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
      ...otherProps,
      messages,
      now: new Date().getTime(),
    },
  };
};

export default HomePage;
