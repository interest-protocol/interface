import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';

import { SwitchLang } from '@/components';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Typography } from '@/elements';
import useEventListener from '@/hooks/use-event-listener';
import { LogoSVG } from '@/svg';
import { logGenericEvent } from '@/utils/analytics';

import MobileMenu from './mobile-menu';
import Wallet from './wallet';

const Header: FC = () => {
  const { pathname } = useRouter();

  const [isMobile, setIsMobile] = useState(false);

  const handleSetDesktop = useCallback(() => {
    const mediaIsMobile = !window.matchMedia('(min-width: 64em)').matches;
    setIsMobile(mediaIsMobile);
  }, []);

  useEventListener('resize', handleSetDesktop, true);

  const trackHeaderNavigation = (label: string) => () =>
    logGenericEvent(`Desktop_Header_${label}`);

  return (
    <Box
      py="M"
      as="header"
      bg="foreground"
      px={['M', 'L']}
      alignItems="center"
      justifyContent="space-between"
      display={['flex', 'flex', 'grid']}
      gridTemplateColumns="repeat(3, 1fr)"
    >
      <Box display="flex" alignItems="center">
        <Link
          href={Routes[RoutesEnum.Home]}
          onClick={trackHeaderNavigation(RoutesEnum.Home)}
        >
          <Box
            mr="L"
            color="text"
            width="2.5rem"
            height="2.5rem"
            maxWidth="50px"
            maxHeight="50px"
            cursor="pointer"
            hover={{ color: 'accent' }}
            active={{ color: 'accentSecondary' }}
          >
            <LogoSVG
              maxHeight="2.5rem"
              maxWidth="2.5rem"
              width="100%"
              aria-label="Logo"
              fill="currentColor"
            />
          </Box>
        </Link>
      </Box>
      <Box
        alignItems="center"
        justifyContent="center"
        display={['none', 'none', 'flex']}
      >
        <Link
          href={Routes[RoutesEnum.DEX]}
          onClick={trackHeaderNavigation(RoutesEnum.DEX)}
        >
          <Typography
            px="XL"
            cursor="pointer"
            variant="normal"
            borderRight="1px solid"
            borderColor="bottomBackground"
            color={
              pathname.includes(Routes[RoutesEnum.DEX]) ? 'accent' : 'inherit'
            }
            hover={{ color: 'accentSecondary' }}
          >
            DEX
          </Typography>
        </Link>
        <Link
          href={Routes[RoutesEnum.Faucet]}
          onClick={trackHeaderNavigation(RoutesEnum.Faucet)}
        >
          <Typography
            px="XL"
            cursor="pointer"
            variant="normal"
            color={
              pathname.includes(Routes[RoutesEnum.Faucet])
                ? 'accent'
                : 'inherit'
            }
            hover={{ color: 'accentSecondary' }}
          >
            FAUCET
          </Typography>
        </Link>
      </Box>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Wallet />
        <Box display="flex" justifyContent="flex-end" alignItems="stretch">
          <Box display="flex" alignItems="stretch">
            <SwitchLang />
          </Box>
        </Box>
      </Box>
      {isMobile && <MobileMenu />}
    </Box>
  );
};

export default Header;
