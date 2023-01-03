import { FC } from 'react';

import { Box } from '@/elements';

import { SEO, Tooltip } from '..';
import Footer from './footer';
import Header from './header';
import { LayoutProps } from './layout.types';

const Layout: FC<LayoutProps> = ({ pageTitle = '', children }) => {
  return (
    <Box color="text" height="100vh" display="flex" flexDirection="column">
      <SEO pageTitle={pageTitle} />
      <Header />
      <Box
        flex="1"
        as="main"
        display="flex"
        position="relative"
        flexDirection="column"
        pb="calc(env(safe-area-inset-bottom) + 4rem)"
        justifyContent="stretch"
      >
        {children}
      </Box>
      <Footer />
      <Tooltip />
    </Box>
  );
};

export default Layout;
