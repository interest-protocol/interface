import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Container, SocialMediaCard } from '@/components';
import { Routes, RoutesEnum } from '@/constants/routes';
import { SOCIAL_MEDIAS } from '@/constants/social-media.data';
import { Box, Button, Typography } from '@/elements';
import { LogoSVG } from '@/svg';

import { HeaderProps } from './header.types';

const Header: FC<HeaderProps> = ({ empty }) => (
  <Box
    top="0"
    zIndex={1}
    as="header"
    width="100vw"
    color="textSoft"
    backdropFilter="blur(10px)"
    position={['sticky', 'fixed']}
    bg={['foreground', 'transparentBackground']}
  >
    <Container
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexDirection={['column', 'row']}
    >
      <Link href={Routes[RoutesEnum.Home]} shallow>
        <Box
          cursor="pointer"
          display="flex"
          alignItems="center"
          my={['L', 'M']}
        >
          <LogoSVG width="3.233rem" />
          <Typography variant="title4" as="h1" ml="L">
            Interest Protocol
          </Typography>
        </Box>
      </Link>
      {!empty && (
        <Box
          as="nav"
          display="flex"
          alignItems="center"
          flexDirection={['column-reverse', 'row']}
        >
          <Box display="flex" my={['L', 'NONE']} alignItems="center">
            {SOCIAL_MEDIAS.map((socialMediaData) => (
              <SocialMediaCard {...socialMediaData} key={v4()} />
            ))}
          </Box>
          <Box textAlign="center" cursor="pointer" my={['L', 'NONE']}>
            <Link href={Routes[RoutesEnum.DApp]}>
              <Button
                ml={['NONE', 'XL']}
                variant="primary"
                type="button"
                effect="hover"
              >
                DApp
              </Button>
            </Link>
          </Box>
        </Box>
      )}
    </Container>
  </Box>
);

export default Header;
