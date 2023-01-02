import { useTheme } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { not } from 'ramda';
import { FC, useCallback, useState } from 'react';

import { SwitchLang } from '@/components';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Typography } from '@/elements';
import useEventListener from '@/hooks/use-event-listener';
import { LogoSVG, MoonSVG, SunSVG } from '@/svg';
import { logGenericEvent } from '@/utils/analytics';

import { Wallet } from '../..';
import MobileMenu from './mobile-menu';

const Header: FC = () => {
  const { setDark, dark } = useTheme() as any;
  const { pathname } = useRouter();

  const [isMobile, setIsMobile] = useState(false);

  const handleSetDesktop = useCallback(() => {
    const mediaIsMobile = !window.matchMedia('(min-width: 64em)').matches;
    setIsMobile(mediaIsMobile);
  }, []);

  useEventListener('resize', handleSetDesktop, true);

  const trackHeaderNavigation = (label: string) => () =>
    logGenericEvent(`Desktop_Header_${label}`);

  const handleChangeTheme = () => setDark(not);

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
            color="logo"
            width="2.5rem"
            height="2.5rem"
            maxWidth="50px"
            maxHeight="50px"
            cursor="pointer"
            hover={{ color: 'accentSecondary' }}
            active={{ color: 'accentActive' }}
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
        <a
          href="https://forms.gle/aDP4wHvshLPKkKv97"
          target="__blank"
          rel="noopener noreferrer"
        >
          <Typography
            ml="L"
            px="L"
            py="M"
            width="100%"
            fontSize="S"
            variant="normal"
            borderRadius="2rem"
            textAlign="center"
            bg="accentAlternative"
            display={['none', 'none', 'none', 'block']}
            hover={{
              bg: 'warning',
            }}
          >
            Feedback
          </Typography>
        </a>
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
            color={
              pathname.includes(Routes[RoutesEnum.DEX]) ? 'accent' : 'inherit'
            }
            hover={{ color: 'accentActive' }}
          >
            DEX
          </Typography>
        </Link>
      </Box>
      <Box display="flex" justifyContent="flex-end" alignItems="stretch">
        <Wallet />
        <Box display="flex" alignItems="stretch">
          <SwitchLang />
          <Box
            mr="S"
            width="3rem"
            height="2.8rem"
            borderRadius="M"
            alignItems="center"
            display="inline-flex"
            bg="transparent"
            justifyContent="center"
            onClick={handleChangeTheme}
            color="text"
          >
            {!dark ? (
              <MoonSVG
                width="1rem"
                maxHeight="3rem"
                maxWidth="3rem"
                fill="currentColor"
              />
            ) : (
              <SunSVG
                width="1rem"
                maxHeight="3rem"
                maxWidth="3rem"
                fill="currentColor"
              />
            )}
          </Box>
        </Box>
        {isMobile && <MobileMenu />}
      </Box>
    </Box>
  );
};

export default Header;
