import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

import Container from '../../components/container';
import SocialMediaCard from '../../components/social-media-card';
import { LogoSVG } from '../../components/svg';
import { Routes, RoutesEnum } from '../../constants/routes';
import { Box, Typography } from '../../elements';
import { SOCIAL_MEDIAS } from '../social-media.data';

const Footer: FC = () => (
  <Box
    as="footer"
    color="textSoft"
    bg="accentSecondary"
    borderTop="0.625rem solid"
    borderColor="accent"
  >
    <Container>
      <Box display="flex" justifyContent="space-between" py="XXXL">
        <Link href={Routes[RoutesEnum.Home]}>
          <Box display="flex" alignItems="center">
            <LogoSVG width="4rem" />
            <Typography variant="title3" whiteSpace="nowrap" ml="L">
              Interest Protocol
            </Typography>
          </Box>
        </Link>
        <Box as="nav" display="flex">
          {SOCIAL_MEDIAS.map((socialMediaData) => (
            <SocialMediaCard {...socialMediaData} key={v4()} />
          ))}
        </Box>
      </Box>
      <Typography variant="normal" textAlign="center" my="M">
        {new Date().getFullYear()}. Interest Protocol. All rights is reserved.
      </Typography>
    </Container>
  </Box>
);

export default Footer;
