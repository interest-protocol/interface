import Head from 'next/head';
import React, { FC } from 'react';

import { Box } from '../elements';
import { LayoutProps } from './layout.types';

const Layout: FC<LayoutProps> = ({ pageTitle = '', children }) => (
  <Box>
    <Head>
      <html lang="pt-PT" />
      <title>Protocol Interest {pageTitle && `| ${pageTitle}`}</title>
    </Head>
    <header />
    <main>{children}</main>
    <footer />
  </Box>
);

export default Layout;
