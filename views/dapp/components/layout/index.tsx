import { ThemeProvider } from '@emotion/react';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Toaster } from 'react-hot-toast';

import { SEO } from '@/components';
import { DAppTheme } from '@/design-system';
import radii from '@/design-system/common/radii';
import colors from '@/design-system/dapp-theme/colors';
import { Box } from '@/elements';
import { useIsMounted } from '@/hooks/use-is-mounted';

import ErrorBoundary from '../error-boundary';
import Footer from './footer';
import Header from './header';
import { LayoutProps } from './layout.types';

const Layout: FC<LayoutProps> = ({ pageTitle = '', children }) => {
  const Tooltip = dynamic(() => import('react-tooltip'));
  const isMounted = useIsMounted();

  return (
    <ThemeProvider theme={DAppTheme}>
      <ErrorBoundary>
        <Box color="text" height="100vh" display="flex" flexDirection="column">
          <SEO pageTitle={pageTitle} />
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            toastOptions={{
              style: {
                color: colors.text,
                borderRadius: radii.M,
                background: colors.foreground,
              },
            }}
          />
          <Header />
          <Box
            flex="1"
            as="main"
            background={[
              DAppTheme.colors.background,
              DAppTheme.colors.specialBackground,
            ]}
          >
            {children}
          </Box>
          <Footer />
          {isMounted.current && (
            <Tooltip place="top" type="dark" effect="solid" multiline />
          )}
        </Box>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default Layout;
