import Head from 'next/head';
import React, { FC } from 'react';

import { Box } from '../elements';
import Header from './header';
import { LayoutProps } from './layout.types';

const Layout: FC<LayoutProps> = ({ pageTitle = '', children }) => (
  <Box minHeight="120vh">
    <Head>
      <html lang="pt-PT" />
      <title>Protocol Interest {pageTitle && `| ${pageTitle}`}</title>
    </Head>
    <Header />
    <main>{children}</main>
    <footer />
  </Box>
);

export default Layout;
