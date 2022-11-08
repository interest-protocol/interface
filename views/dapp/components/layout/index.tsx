import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';

import { SEO, Tooltip } from '@/components';
import { RoutesWithFaucet } from '@/constants';
import { DAppTheme } from '@/design-system';
import radii from '@/design-system/common/radii';
import colors from '@/design-system/dapp-theme/colors';
import { Box } from '@/elements';
import { FCWithChildren } from '@/interface';

import ErrorBoundary from '../error-boundary';
import Faucet from '../faucet';
import Footer from './footer';
import Header from './header';
import { LayoutProps } from './layout.types';

const Layout: FCWithChildren<LayoutProps> = ({ pageTitle = '', children }) => {
  const { pathname } = useRouter();

  return (
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
          display="flex"
          position="relative"
          flexDirection="column"
          pb="calc(env(safe-area-inset-bottom) + 4rem)"
          justifyContent="stretch"
          background={[
            DAppTheme.colors.background,
            DAppTheme.colors.specialBackground,
          ]}
        >
          {children}
          <Box
            right="0"
            bottom="0"
            position="absolute"
            display={['none', 'none', 'none', 'block']}
          >
            {RoutesWithFaucet.includes(pathname) && <Faucet />}
          </Box>
        </Box>
        <Footer />
        <Tooltip />
      </Box>
    </ErrorBoundary>
  );
};

export default Layout;
