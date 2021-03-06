import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { v4 } from 'uuid';

import { Container, SocialMediaCard } from '@/components';
import { Routes, RoutesEnum, SOCIAL_MEDIAS } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import { BarsLPSVG, LogoSVG, TimesSVG } from '@/svg';

import { HeaderProps } from './header.types';
import MenuList from './menu-list';

const AnimatedBox = animated(Box);
const menuButtonId = `menu-wrapper-${v4()}`;

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
    if (event?.path?.some((node: any) => node?.id == menuButtonId)) return;
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
            <LogoSVG width="2rem" />
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
              </Box>
              <Box textAlign="center" cursor="pointer" my={['L', 'NONE']}>
                <Button
                  type="button"
                  effect="hover"
                  variant="secondary"
                  onClick={() => push(Routes[RoutesEnum.DApp])}
                >
                  DApp
                </Button>
              </Box>
            </Box>
            <Box
              id={menuButtonId}
              cursor="pointer"
              onClick={toggleMenu}
              display={['block', 'none']}
            >
              <Box width="2rem" p="S">
                {mobileMenu ? (
                  <TimesSVG width="100%" />
                ) : (
                  <BarsLPSVG width="100%" />
                )}
              </Box>
            </Box>
          </>
        )}
      </Container>
      <AnimatedBox
        ref={dropdownContainerRef}
        overflow="hidden"
        style={fadeStyles}
      >
        <MenuList />
      </AnimatedBox>
    </Box>
  );
};

export default Header;
