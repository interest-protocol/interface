import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { Routes, RoutesEnum, SOCIAL_MEDIAS } from '@/constants';
import { Box } from '@/elements';
import { LogoSVG } from '@/svg';

import SocialMediaCard from '../../components/social-media-card';

const Footer: FC = () => (
  <Box as="footer" bg="text" py={['L', 'M']}>
    <Container
      display="flex"
      alignItems="center"
      flexDirection={['column', 'row']}
      justifyContent={['center', 'space-between']}
    >
      <Link href={Routes[RoutesEnum.Home]}>
        <LogoSVG width="2.5rem" fill="white" />
      </Link>
      <Box
        as="nav"
        display="flex"
        width={['100%', 'auto']}
        mb={['L', 'NONE']}
        mt={['XL', 'NONE']}
        alignItems="center"
        color="textInverted"
        justifyContent="space-around"
      >
        {SOCIAL_MEDIAS.map((socialMediaData) => (
          <SocialMediaCard {...socialMediaData} key={v4()} />
        ))}
      </Box>
    </Container>
  </Box>
);

export default Footer;
