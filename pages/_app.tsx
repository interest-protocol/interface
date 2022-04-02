import 'react-loading-skeleton/dist/skeleton.css';

import { Global, ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import NextProgress from 'next-progress';
import { ReactNode, StrictMode } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';

import { LightTheme } from '@/design-system';
import GlobalStyles from '@/design-system/global-styles';

const MyApp = ({ Component, pageProps }: AppProps): ReactNode => (
  <>
    <Head>
      <title>Interest Protocol</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <NextProgress options={{ showSpinner: false }} />
    <ThemeProvider theme={LightTheme}>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Global styles={GlobalStyles} />
        <StrictMode>
          <Component {...pageProps} />
        </StrictMode>
      </SkeletonTheme>
    </ThemeProvider>
  </>
);

export default MyApp;
