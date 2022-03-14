import { FC } from 'react';
import { v4 } from 'uuid';

import Container from '../../components/container';
import SocialMediaCard from '../../components/social-media-card';
import { LogoSVG } from '../../components/svg';
import { Routes, RoutesEnum } from '../../constants/routes';
import { Box, Button, Typography } from '../../elements';
import { SOCIAL_MEDIAS } from '../social-media.data';

const Header: FC = () => (
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
      <Box display="flex" alignItems="center" my={['L', 'NONE']}>
        <LogoSVG width="3.233rem" />
        <Typography variant="title4" as="h1" ml="L">
          Interest Protocol
        </Typography>
      </Box>
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
        <Box textAlign="center" my={['L', 'NONE']}>
          <a href={Routes[RoutesEnum.App]} target="__blank">
            <Button ml={['NONE', 'XL']} variant="primary" type="button">
              Launch
            </Button>
          </a>
        </Box>
      </Box>
    </Container>
  </Box>
);

export default Header;
