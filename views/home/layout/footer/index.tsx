/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Container } from '@/components';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Typography } from '@/elements';
import { LogoSVG } from '@/svg';

const Footer: FC = () => {
  const t = useTranslations();
  return (
    <Box
      as="footer"
      bg="text"
      height={['unset', 'unset', 'unset', 'unset']}
      pb="M"
      pt={['L', 'L', 'L', 'unset']}
    >
      <Container>
        <Box
          display="flex"
          height="100%"
          flexDirection={['column', 'column', 'column', 'row']}
          justifyContent={['center', 'space-between']}
        >
          <Box
            display="flex"
            flexDirection={['column', 'column', 'column', 'row']}
            alignItems={['unset', 'unset', 'unset', 'center']}
            pb={['M', 'M', 'M', 'unset']}
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
          </Box>
          <Box>
            <Typography
              variant="normal"
              as="p"
              fontWeight="600"
              letterSpacing="1.5px"
              color="textInverted"
              textTransform="uppercase"
            >
              {t('landingPage.aboutUs')}
            </Typography>
            <a
              href="https://drive.google.com/drive/folders/176q4-80OZaHCJEfBiZHsHYHIH0Z_ipgf?usp=share_link"
              target="__blank"
              title={t('landingPage.mediaKit')}
              rel="noopener noreferrer"
            >
              <Box
                display={['flex', 'flex', 'flex', 'flex']}
                height={'1rem'}
                transition="all 0.3s ease-in-out"
                hover={{
                  transform: 'scale(1.1)',
                }}
                color="#fff"
              >
                <Typography
                  as="span"
                  fontSize="S"
                  variant="normal"
                  lineHeight="normal"
                  color="textInverted"
                >
                  {t('landingPage.mediaKit')}
                </Typography>
              </Box>
            </a>
          </Box>
        </Box>
        <Box as="hr" color="#262626" mt="XL" mb="L" />
        <Typography
          fontSize="XS"
          variant="normal"
          lineHeight="normal"
          color="textInverted"
          ml="M"
          textAlign="center"
        >
          © {new Date().getFullYear()}. Interest Protocol from Interest Labs
          Inc. - 6820994.{' '}
          <Typography
            as="span"
            fontSize="XS"
            variant="normal"
            textAlign="center"
            lineHeight="normal"
            color="textInverted"
            display={['block', 'inline-block']}
          >
            {t('landingPage.footerCopyrights')}
          </Typography>
        </Typography>
      </Container>
    </Box>
  );
};
export default Footer;
