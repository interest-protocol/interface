import Head from 'next/head';
import React, { FC } from 'react';

import { Box } from '../elements';
import Footer from './footer';
import Header from './header';
import { LayoutProps } from './layout.types';

const Layout: FC<LayoutProps> = ({ pageTitle = '', children }) => (
  <Box>
    <Head>
      <html lang="pt-PT" />
      <title>Interest Protocol {pageTitle && `| ${pageTitle}`}</title>
    </Head>
    <Header />
    <main>{children}</main>
    <Footer />
  </Box>
);

export default Layout;
