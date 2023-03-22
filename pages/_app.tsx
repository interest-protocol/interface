import 'react-loading-skeleton/dist/skeleton.css';

import { Global, ThemeProvider } from '@emotion/react';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import NextProgress from 'next-progress';
import { ReactNode, StrictMode, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { SkeletonTheme } from 'react-loading-skeleton';

import { NextIntlProvider } from '@/components';
import { Routes } from '@/constants';
import { DAppTheme, GlobalStyles, LandingPageTheme } from '@/design-system';
import radii from '@/design-system/common/radii';
import colors from '@/design-system/dapp-theme/colors';
import { NextPageDefaultProps } from '@/interface';
import { initGA, logPageView } from '@/utils/analytics';
import HomePageLayout from '@/views/home/layout';

type Props = Omit<AppProps<NextPageDefaultProps>, 'pageProps'> & {
  pageProps: NextPageDefaultProps;
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
          <StrictMode>
            <Global styles={GlobalStyles} />
            {router.pathname !== Routes.home ? (
              <ThemeProvider theme={DAppTheme}>
                <Component {...pageProps} />
                <Toaster
                  position="bottom-right"
                  reverseOrder={false}
                  toastOptions={{
                    style: {
                      color: colors.text,
                      borderRadius: radii.M,
                      background: colors.foreground,
                    },
                  }}
                />
              </ThemeProvider>
            ) : (
              <ThemeProvider theme={LandingPageTheme}>
                <HomePageLayout pageTitle={pageProps.pageTitle}>
                  <Component {...pageProps} />
                </HomePageLayout>
              </ThemeProvider>
            )}
            <VercelAnalytics />
          </StrictMode>
        </SkeletonTheme>
      </NextIntlProvider>
    </>
  );
};

export default MyApp;
