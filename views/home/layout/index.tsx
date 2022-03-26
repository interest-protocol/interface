import { FC } from 'react';
import { Toaster } from 'react-hot-toast';

import colors from '@/design-system/light-theme/colors';

import SEO from '../../../components/SEO';
import { Box } from '../../../elements';
import Footer from './footer';
import Header from './header';
import { LayoutProps } from './layout.types';

const Layout: FC<LayoutProps> = ({ pageTitle = '', children }) => (
  <Box>
    <SEO pageTitle={pageTitle} />
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
    <Header />
    <main>{children}</main>
    <Footer />
  </Box>
);

export default Layout;
