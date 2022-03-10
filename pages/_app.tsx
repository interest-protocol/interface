import { Global, ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import { ReactNode } from 'react';

import { LightTheme } from '../design-system';
import GlobalStyles from '../design-system/global-styles';

const MyApp = ({ Component, pageProps }: AppProps): ReactNode => (
  <ThemeProvider theme={LightTheme}>
    <Global styles={GlobalStyles} />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default MyApp;
