import Link from 'next/link';
import { always } from 'ramda';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { Routes, RoutesEnum, SOCIAL_MEDIAS } from '@/constants';
import { Box, Typography } from '@/elements';
import { LogoSVG } from '@/svg';

import SocialMediaCard from '../../components/social-media-card';

const Footer: FC = always(
  <Box as="footer" bg="text" height={['unset', 'unset', 'unset', '3.75rem']}>
    <Container
      display="flex"
      height="100%"
      alignItems="center"
      flexDirection={['column', 'column', 'column', 'row']}
      justifyContent={['center', 'space-between']}
    >
      <Box
        display="flex"
        flexDirection={['column', 'column', 'column', 'row']}
        alignItems="center"
        justifyContent="center"
        pt={['2rem', '2rem', '2rem', 'unset']}
      >
        <Link href={Routes[RoutesEnum.Home]}>
          <Box>
            <LogoSVG width="2rem" fill="white" />
          </Box>
        </Link>
        <Typography
          px="M"
          mt={['L', 'L', 'L', 'unset']}
          fontSize="S"
          variant="normal"
          textAlign="center"
          color="textInverted"
        >
          © {new Date().getFullYear()}. Interest Protocol from DEFI, lda. All
          rights reserved.
        </Typography>
      </Box>
      <Box
        as="nav"
        display="flex"
        width={['100%', '100%', '100%', 'auto']}
        mb={['3.313rem', '3.313rem', '3.313rem', 'NONE']}
        mt={['2.688rem', '2.688rem', '2.688rem', 'NONE']}
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
