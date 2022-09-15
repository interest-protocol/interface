import { GetStaticProps, NextPage } from 'next';

import RedirectLang from '@/components/redirect-lang';
import Home from '@/views/home';

const HomePage: NextPage = () => (
  <>
    <RedirectLang />
    <Home />
  </>
);

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
  },
});

export default HomePage;
