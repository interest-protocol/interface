import 'react-loading-skeleton/dist/skeleton.css';

import { Global } from '@emotion/react';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import NextProgress from 'next-progress';
import { ReactNode, StrictMode, useEffect } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';

import { NextIntlProvider, Web3Manager } from '@/components';
import { GlobalStyles } from '@/design-system';
import { TTranslatedMessage } from '@/interface';
import { initGA, logPageView } from '@/utils/analytics';

interface PageProps {
  now: number;
  pageTitle: string;
  messages: TTranslatedMessage;
}

type Props = Omit<AppProps<PageProps>, 'pageProps'> & {
  pageProps: PageProps;
};

const MyApp = ({ Component, pageProps, router }: Props): ReactNode => {
  useEffect(() => {
    initGA();
    // `routeChangeComplete` won't run for the first page load unless the query string is
    // hydrated later on, so here we log a page view if this is the first render and
    // there's no query string
    if (!router.asPath.includes('?')) logPageView();
  }, []);

  useEffect(() => {
    // Listen for page changes after a navigation or when the query changes
    router.events.on('routeChangeComplete', logPageView);
    return () => {
      router.events.off('routeChangeComplete', logPageView);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Interest Protocol</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <link href="https://fonts.googleapis.com" />
        <link href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;display=swap"
          rel="stylesheet"
        />
      </Head>
      <NextProgress options={{ showSpinner: false }} />
      <NextIntlProvider
        formats={{
          dateTime: {
            short: {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            },
          },
        }}
        messages={pageProps.messages}
        now={new Date(pageProps.now)}
        timeZone="UTC"
      >
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <Global styles={GlobalStyles} />
          <Web3Manager
            pageTitle={pageProps.pageTitle}
            pathname={router.pathname}
          >
            <StrictMode>
              <Component {...pageProps} />
              <VercelAnalytics />
            </StrictMode>
          </Web3Manager>
        </SkeletonTheme>
      </NextIntlProvider>
    </>
  );
};

export default MyApp;
