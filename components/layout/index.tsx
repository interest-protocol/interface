import React, { FC } from 'react';
import Head from 'next/head';

import { View } from '../../elements';
import { LayoutProps } from './layout.types';

// eslint-disable-next-line react/prop-types
const Layout: FC<LayoutProps> = ({ pageTitle = '', children }) => (
  <View>
    <Head>
      <html lang="pt-PT" />
      <title>Template | {pageTitle}</title>
    </Head>
    <header />
    <main>{children}</main>
    <footer />
  </View>
);

export default Layout;
