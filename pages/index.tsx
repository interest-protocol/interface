import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { mergeDeepRight } from 'ramda';
import { useEffect, useState } from 'react';

import { Box } from '../elements';

const DynamicHome = dynamic(() => import('../views/home'));

const HomePage: NextPage = () => {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (document.readyState === 'complete') {
      setLoad(false);
    } else {
      window.addEventListener('load', () => setLoad(true));
      return () => window.removeEventListener('load', () => setLoad(false));
    }
  }, []);

  return load ? (
    <DynamicHome />
  ) : (
    <Box
      position="absolute"
      width="100vw"
      height="100vh"
      background="red"
      zIndex={9}
    />
  );
};

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
      now: Date.now(),
      pageTitle: 'landingPage.pageTitle',
    },
  };
};

export default HomePage;
