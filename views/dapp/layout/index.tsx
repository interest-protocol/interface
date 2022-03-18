import { ThemeProvider } from '@emotion/react';
import { FC } from 'react';

import SEO from '../../../components/SEO';
import { DAppTheme } from '../../../design-system';
import { Box } from '../../../elements';
import Footer from './footer';
import Header from './header';
import { LayoutProps } from './layout.types';

const Layout: FC<LayoutProps> = ({ pageTitle = '', children }) => (
  <ThemeProvider theme={DAppTheme}>
    <Box color="text" height="100vh" display="flex" flexDirection="column">
      <SEO pageTitle={pageTitle} />
      <Header />
      <Box as="main" bg="background" flex="1">
        {children}
      </Box>
      <Footer />
    </Box>
  </ThemeProvider>
);

export default Layout;
