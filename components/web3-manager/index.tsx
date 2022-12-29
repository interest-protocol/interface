import { ThemeProvider } from '@emotion/react';
import { FC, useState } from 'react';

import { Routes, SUPPORTED_CHAINS_RECORD } from '@/constants';
import { LandingPageTheme } from '@/design-system';
import { DAppDarkTheme, DAppLightTheme } from '@/design-system/dapp-theme';
import { Layout } from '@/views/dapp/components';
import HomePageLayout from '@/views/home/layout';

import { Web3ManagerProps, Web3ManagerWrapperProps } from './web3-manager.type';

const Web3Manager: FC<Web3ManagerProps> = ({ children, pageTitle }) => (
  <Layout pageTitle={pageTitle}>{children}</Layout>
);

const Web3ManagerWrapper: FC<Web3ManagerWrapperProps> = ({
  pathname,
  pageTitle,
  children,
}) => {
  const [dark, setDark] = useState(false);

  return pathname !== Routes.home ? (
    <ThemeProvider
      theme={{ setDark, ...(dark ? DAppDarkTheme : DAppLightTheme) }}
    >
      <Web3Manager
        pageTitle={pageTitle}
        supportedChains={SUPPORTED_CHAINS_RECORD[pathname]}
      >
        {children}
      </Web3Manager>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={LandingPageTheme}>
      <HomePageLayout pageTitle={pageTitle}>{children}</HomePageLayout>
    </ThemeProvider>
  );
};

export default Web3ManagerWrapper;
