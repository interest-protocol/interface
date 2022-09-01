import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { v4 } from 'uuid';

import { Container, SocialMediaCard, SwitchLang } from '@/components';
import { Routes, RoutesEnum, SOCIAL_MEDIAS } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import { BarsLPSVG, LogoSVG, TimesSVG } from '@/svg';

import { HeaderProps } from './header.types';
import MenuList from './menu-list';

const AnimatedBox = animated(Box);
const menuButtonId = 'landing-menu-wrapper-id';

const Header: FC<HeaderProps> = ({ empty }) => {
  const { push } = useRouter();
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);

  const fadeStyles = useSpring({
    from: { maxHeight: '0rem', minHeight: '0rem' },
    to: {
      minHeight: mobileMenu ? '10rem' : '0rem',
      maxHeight: mobileMenu ? '30rem' : '0rem',
    },
  });
  const toggleMenu = () => setMobileMenu(!mobileMenu);

  const handleCloseMenu = useCallback((event: any) => {
    if (
      event?.path?.some((node: any) => node?.id == menuButtonId) ||
      // Safari Stuff
      event?.target.id === menuButtonId ||
      event?.target.id === `${menuButtonId}-submenu`
    )
      return;
    setMobileMenu(false);
  }, []);

  const dropdownContainerRef =
    useClickOutsideListenerRef<HTMLDivElement>(handleCloseMenu);

  const handleChangeScrollPercentage = () =>
    setScrollPercentage(
      window.scrollY < window.innerHeight
        ? window.scrollY / window.innerHeight
        : 1
    );

  useEffect(() => {
    window.addEventListener('scroll', handleChangeScrollPercentage);
    return () =>
      window.removeEventListener('scroll', handleChangeScrollPercentage);
  }, []);

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
        !mobileMenu ? `rgba(255, 255, 255, ${scrollPercentage})` : 'background',
        !mobileMenu ? `rgba(255, 255, 255, ${scrollPercentage})` : 'background',
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
        <Link href={Routes[RoutesEnum.Home]} shallow>
          <Box
            cursor="pointer"
            display="flex"
            alignItems="center"
            my={['L', 'M']}
          >
            <Box width="2rem">
              <LogoSVG width="100%" />
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
                  onClick={() => push(Routes[RoutesEnum.DApp])}
                >
                  DApp
                </Button>
              </Box>
            </Box>
            <Box display={['flex', 'none']} alignItems="center">
              <SwitchLang />
              <Box id={menuButtonId} cursor="pointer" onClick={toggleMenu}>
                <Box width="2rem" p="S" pointerEvents="none">
                  {mobileMenu ? (
                    <TimesSVG width="100%" />
                  ) : (
                    <BarsLPSVG width="100%" />
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
    </Box>
  );
};

export default Header;
