import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { v4 } from 'uuid';

import { Container, SocialMediaCard, SwitchLang } from '@/components';
import { Routes, RoutesEnum, SOCIAL_MEDIAS } from '@/constants';
import { GAAction, GACategory } from '@/constants/google-analytics';
import { Box, Button, RefBox, Typography } from '@/elements';
import { useLocale } from '@/hooks';
import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import useEventListener from '@/hooks/use-event-listener';
import { BarsLPSVG, LogoSVG, TimesSVG } from '@/svg';
import { getSafeLocaleSVG } from '@/utils';
import { logEvent } from '@/utils/analytics';

import { HeaderProps } from './header.types';
import LangList from './lang-list';
import MenuList from './menu-list';

const AnimatedBox = animated(RefBox);
const menuButtonId = 'landing-menu-wrapper-id';
const menuLangId = 'landing-switch-lang-id';

const Header: FC<HeaderProps> = ({ empty }) => {
  const { push } = useRouter();
  const { currentLocale } = useLocale();
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [switchLang, setSwitchLang] = useState(false);

  const fadeStyles = useSpring({
    from: { maxHeight: '0rem', minHeight: '0rem' },
    to: {
      minHeight: mobileMenu ? '10rem' : '0rem',
      maxHeight: mobileMenu ? '30rem' : '0rem',
    },
  });

  const fadeLangStyles = useSpring({
    from: { maxHeight: '0rem', minHeight: '0rem' },
    to: {
      minHeight: switchLang ? '3rem' : '0rem',
      maxHeight: switchLang ? '30rem' : '0rem',
    },
  });

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
    setSwitchLang(false);
  };

  const toggleSwitchLang = () => {
    setSwitchLang(!switchLang);
    setMobileMenu(false);
  };

  const handleCloseMenu = useCallback((event: any) => {
    if (
      event?.path?.some(
        (node: any) => node?.id == menuButtonId || node?.id == menuLangId
      ) ||
      // Safari Stuff
      event?.target.id === menuButtonId ||
      event?.target.id === menuLangId ||
      event?.target.id === `${menuButtonId}-submenu`
    )
      return;
    setMobileMenu(false);
    setSwitchLang(false);
  }, []);

  const dropdownContainerRef =
    useClickOutsideListenerRef<HTMLDivElement>(handleCloseMenu);

  const handleChangeScrollPercentage = () =>
    setScrollPercentage(
      window.scrollY < window.innerHeight
        ? window.scrollY / window.innerHeight
        : 1
    );

  const handleHideMenuOnResize = () => {
    setMobileMenu(false);
    setSwitchLang(false);
  };

  useEventListener('scroll', handleChangeScrollPercentage, true);

  useEventListener('resize', handleHideMenuOnResize, true);

  return (
    <Box
      top="0"
      zIndex={3}
      as="header"
      color="text"
      width="100vw"
      position="fixed"
      backdropFilter="blur(10px)"
      bg={[
        !mobileMenu
          ? !switchLang
            ? `rgba(255, 255, 255, ${scrollPercentage})`
            : 'background'
          : 'background',
        !mobileMenu
          ? !switchLang
            ? `rgba(255, 255, 255, ${scrollPercentage})`
            : 'background'
          : 'background',
        `rgba(255, 255, 255, ${scrollPercentage})`,
        `rgba(255, 255, 255, ${scrollPercentage})`,
      ]}
      boxShadow={`0 0 0.5rem rgba(0, 0, 0, ${0.1 * scrollPercentage})`}
    >
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Link href={Routes[RoutesEnum.Home]}>
          <Box
            cursor="pointer"
            display="flex"
            alignItems="center"
            my={['L', 'M']}
          >
            <Box width="2rem">
              <LogoSVG width="2rem" maxHeight="2rem" maxWidth="2rem" />
            </Box>
            <Typography
              variant="normal"
              as="h1"
              ml="0.875rem"
              fontStyle="normal"
              fontSize="1.25rem"
              lineHeight="1.524rem"
              fontWeight="900"
              display={['none', 'block']}
            >
              Interest Protocol
            </Typography>
          </Box>
        </Link>
        {!empty && (
          <>
            <Box
              as="nav"
              alignItems="center"
              display={['none', 'flex']}
              flexDirection={['column-reverse', 'row']}
            >
              <Box
                display="flex"
                my={['L', 'NONE']}
                alignItems="center"
                mr="1.938rem"
              >
                {SOCIAL_MEDIAS.map((socialMediaData) => (
                  <SocialMediaCard {...socialMediaData} key={v4()} />
                ))}
                <SwitchLang />
              </Box>
              <Box
                textAlign="center"
                cursor="pointer"
                my={['L', 'NONE']}
                display="flex"
              >
                <Button
                  type="button"
                  effect="hover"
                  variant="secondary"
                  mr="0.75rem"
                  onClick={() => {
                    logEvent(
                      GACategory.HeaderNavigation,
                      GAAction.Access,
                      'Access to DApp from Home'
                    );
                    push(Routes[RoutesEnum.DApp]);
                  }}
                >
                  DApp
                </Button>
              </Box>
            </Box>
            <Box display={['flex', 'none']} alignItems="center">
              <Box
                ml={['L', '0.75rem']}
                mr={['L', '0.75rem']}
                width={switchLang ? '2rem' : '1.25rem'}
                height={switchLang ? '2rem' : '1.25rem'}
                borderRadius="2rem"
                cursor="pointer"
                onClick={toggleSwitchLang}
                id={menuLangId}
              >
                {switchLang ? (
                  <TimesSVG
                    width="100%"
                    maxWidth={switchLang ? '2rem' : '1.25rem'}
                    maxHeight={switchLang ? '2rem' : '1.25rem'}
                  />
                ) : (
                  <Box pointerEvents="none">
                    {getSafeLocaleSVG(currentLocale)}
                  </Box>
                )}
              </Box>
              <Box id={menuButtonId} cursor="pointer" onClick={toggleMenu}>
                <Box width="2rem" p="S" pointerEvents="none">
                  {mobileMenu ? (
                    <TimesSVG
                      width="100%"
                      height="100%"
                      maxHeight="2rem"
                      maxWidth="2rem"
                    />
                  ) : (
                    <BarsLPSVG width="100%" maxHeight="2rem" maxWidth="2rem" />
                  )}
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Container>
      <AnimatedBox
        overflow="hidden"
        style={fadeStyles}
        ref={dropdownContainerRef}
      >
        <MenuList id={menuButtonId} />
      </AnimatedBox>
      <AnimatedBox overflow="hidden" style={fadeLangStyles}>
        <LangList />
      </AnimatedBox>
    </Box>
  );
};

export default Header;
