import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { Routes, RoutesEnum, SOCIAL_MEDIAS } from '@/constants';
import { Box, Typography } from '@/elements';
import { LogoSVG } from '@/svg';

import SocialMediaCard from '../../components/social-media-card';

const Footer: FC = () => {
  const t = useTranslations();
  return (
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
            <Box width="2rem">
              <LogoSVG
                width="100%"
                fill="white"
                maxHeight="2rem"
                maxWidth="2rem"
              />
            </Box>
          </Link>
          <Typography
            px="M"
            fontSize="S"
            variant="normal"
            textAlign="center"
            lineHeight="normal"
            color="textInverted"
            mt={['L', 'L', 'L', 'unset']}
          >
            © {new Date().getFullYear()}. Interest Protocol from Interest Labs
            Inc. - 6820994.{' '}
            <Typography
              as="span"
              fontSize="S"
              variant="normal"
              textAlign="center"
              lineHeight="normal"
              color="textInverted"
              display={['block', 'inline-block']}
            >
              {t('landingPage.footerCopyrights')}
            </Typography>
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
};
export default Footer;
