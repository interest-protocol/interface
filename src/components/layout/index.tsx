import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import { View } from '../../elements';
import { LayoutProps } from './layout.types';

// eslint-disable-next-line react/prop-types
const Layout: FC<LayoutProps> = ({ pageTitle = '', children }) => (
  <View>
    <Helmet>
      <html lang="pt-PT" />
      <title>Template | {pageTitle}</title>
    </Helmet>
    <header />
    <main>{children}</main>
    <footer />
  </View>
);

export default Layout;
