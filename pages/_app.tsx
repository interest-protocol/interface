import 'react-loading-skeleton/dist/skeleton.css';

import { Global } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { NextIntlProvider } from 'next-intl';
import NextProgress from 'next-progress';
import { ReactNode, StrictMode } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Provider as ReduxProvider } from 'react-redux';

import { Web3Manager } from '@/components';
import GlobalStyles from '@/design-system/global-styles';
import { store } from '@/state/index';

const MyApp = ({ Component, pageProps, router }: AppProps): ReactNode => (
  <>
    <Head>
      <title>Interest Protocol</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
      />
    </Head>
    <NextProgress options={{ showSpinner: false }} />
    <ReduxProvider store={store}>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Global styles={GlobalStyles} />
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
          <Web3Manager
            pathname={router.pathname}
            pageTitle={pageProps.pageTitle}
          >
            <StrictMode>
              <Component {...pageProps} />
            </StrictMode>
          </Web3Manager>
        </NextIntlProvider>
      </SkeletonTheme>
    </ReduxProvider>
  </>
);

export default MyApp;
