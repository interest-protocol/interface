import { FC } from 'react';
import { Toaster } from 'react-hot-toast';

import colors from '@/design-system/landing-page-theme/colors';

import SEO from '../../../components/SEO';
import { Box } from '../../../elements';
import Footer from './footer';
import Header from './header';
import { LayoutProps } from './layout.types';
import { getLPToastOption } from './layout.utils';

const Layout: FC<LayoutProps> = ({ pageTitle = '', children }) => (
  <Box>
    <SEO pageTitle={pageTitle} />
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      toastOptions={getLPToastOption(colors)}
    />
    <Header />
    <main>{children}</main>
    <Footer />
  </Box>
);

export default Layout;
