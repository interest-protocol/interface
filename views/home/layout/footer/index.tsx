import { Container, SocialMediaCard } from '@components';
import { Routes, RoutesEnum } from '@constants/routes';
import { SOCIAL_MEDIAS } from '@constants/social-media.data';
import { Box, Typography } from '@elements';
import { LogoSVG } from '@svg';
import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

const Footer: FC = () => (
  <Box
    as="footer"
    color="textSoft"
    bg="accentSecondary"
    borderTop="0.625rem solid"
    borderColor="accent"
  >
    <Container>
      <Box
        py={['NONE', 'XXXL']}
        display="flex"
        justifyContent="space-between"
        flexDirection={['column', 'row']}
      >
        <Link href={Routes[RoutesEnum.Home]}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={['L', 'NONE']}
            py={['L', 'NONE']}
          >
            <Box as="span" display={['none', 'inline']}>
              <LogoSVG width="4rem" />
            </Box>
            <Box as="span" display={['inline', 'none']}>
              <LogoSVG width="2rem" />
            </Box>
            <Typography
              ml="L"
              variant="title4"
              whiteSpace="nowrap"
              fontSize={['S', 'L']}
            >
              Interest Protocol
            </Typography>
          </Box>
        </Link>
        <Box
          as="nav"
          display="flex"
          py={['L', 'NONE']}
          alignItems="center"
          justifyContent="center"
        >
          {SOCIAL_MEDIAS.map((socialMediaData) => (
            <SocialMediaCard {...socialMediaData} key={v4()} />
          ))}
        </Box>
      </Box>
      <Typography
        my="M"
        fontSize="S"
        variant="normal"
        textAlign="center"
        py={['L', 'NONE']}
      >
        © {new Date().getFullYear()}. Interest Protocol from DEFI, lda. All
        rights reserved.
      </Typography>
    </Container>
  </Box>
);

export default Footer;
