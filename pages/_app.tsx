import 'react-loading-skeleton/dist/skeleton.css';

import createCache from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactNode, StrictMode } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { WagmiConfig } from 'wagmi';

import { NextIntlProvider, Web3Manager } from '@/components';
import { wagmiClient } from '@/connectors';
import { GlobalStyles } from '@/design-system';

const cache = createCache({ key: 'interest-protocol' });

const MyApp = ({ Component, pageProps, router }: AppProps): ReactNode => (
  <>
    <Head>
      <title>Interest Protocol</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
      />
    </Head>
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
      <WagmiConfig client={wagmiClient}>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <Global styles={GlobalStyles} />
          <CacheProvider value={cache}>
            <Web3Manager
              pageTitle={pageProps.pageTitle}
              pathname={router.pathname}
            >
              <StrictMode>
                <Component {...pageProps} />
              </StrictMode>
            </Web3Manager>
          </CacheProvider>
        </SkeletonTheme>
      </WagmiConfig>
    </NextIntlProvider>
  </>
);

export default MyApp;
