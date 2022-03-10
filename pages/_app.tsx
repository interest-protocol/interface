import { Global, ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactNode } from 'react';

import { LightTheme } from '../design-system';
import GlobalStyles from '../design-system/global-styles';

const MyApp = ({ Component, pageProps }: AppProps): ReactNode => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <ThemeProvider theme={LightTheme}>
      <Global styles={GlobalStyles} />
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default MyApp;
