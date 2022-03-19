import { Global, ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import { LightTheme } from '../design-system';
import GlobalStyles from '../design-system/global-styles';
import colors from '../design-system/light-theme/colors';

const MyApp = ({ Component, pageProps }: AppProps): ReactNode => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <ThemeProvider theme={LightTheme}>
      <Global styles={GlobalStyles} />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          loading: {
            style: {
              borderRadius: '0',
              borderBottom: `0.4rem solid ${colors.accent}`,
            },
          },
          blank: {
            style: {
              borderRadius: '0',
            },
          },
          success: {
            style: {
              borderRadius: '0',
              borderBottom: `0.4rem solid ${colors.success}`,
            },
          },
          error: {
            style: {
              borderRadius: '0',
              borderBottom: `0.4rem solid ${colors.error}`,
            },
          },
        }}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default MyApp;
