import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { mergeDeepRight } from 'ramda';

const DynamicHome = dynamic(() => import('../views/home'), {});

const HomePage: NextPage = () => <DynamicHome />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
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
      now: Date.now(),
      pageTitle: 'landingPage.pageTitle',
    },
  };
};

export default HomePage;
