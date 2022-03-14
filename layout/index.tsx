import { FC } from 'react';

import SEO from '../components/SEO';
import { Box } from '../elements';
import Footer from './footer';
import Header from './header';
import { LayoutProps } from './layout.types';

const Layout: FC<LayoutProps> = ({ pageTitle = '', children }) => (
  <Box>
    <SEO pageTitle={pageTitle} />
    <Header />
    <main>{children}</main>
    <Footer />
  </Box>
);

export default Layout;
