import { Global, ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import NextProgress from 'next-progress';
import { ReactNode } from 'react';

import { LightTheme } from '@/design-system';
import GlobalStyles from '@/design-system/global-styles';

const MyApp = ({ Component, pageProps }: AppProps): ReactNode => (
  <>
    <Head>
      <title>Interest Protocol</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <NextProgress />
    <ThemeProvider theme={LightTheme}>
      <Global styles={GlobalStyles} />
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default MyApp;
