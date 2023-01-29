import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

import Container from '@/components/container';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Button, ResponsiveImage, Typography } from '@/elements';

import {
  BAYCOrbit,
  BRLOrbit,
  EUROrbit,
  OILOrbit,
  TSLAOrbit,
  XAUOrbit,
} from './diversity-animations';

const Diversity: FC = () => {
  const { push } = useRouter();
  const t = useTranslations();

  return (
    <Box as="section" position="relative">
      <Container
        gridGap="2rem"
        alignItems="center"
        justifyItems="center"
        py={['XXL', 'XXL', 'XXL', 'XXXL']}
        display={['flex', 'flex', 'flex', 'grid']}
        flexDirection={['column', 'column', 'column', 'unset']}
        gridTemplateColumns={['unset', 'unset', 'unset', '1fr 1fr']}
      >
        <Box
          display="flex"
          flexDirection="column"
          pl={['1.25rem', '1.25rem', '3.75rem', '3.75rem']}
          pt={['1.875rem', '1.875rem', '1.875rem', '5rem']}
          width={['100%', '100%', '41.625rem', '41.625rem']}
          pb={['1.875rem', '1.875rem', '1.875rem', '6.063rem']}
          alignItems={['center', 'center', 'center', 'unset']}
        >
          <Typography
            as="h2"
            variant="normal"
            fontStyle="normal"
            fontWeight="900"
            textAlign={['center', 'unset']}
            fontSize={['2.25rem', '2.25rem', '2.25rem', '2.75rem']}
            lineHeight={['2.743rem', '2.743rem', '2.743rem', '4.876rem']}
            textTransform="capitalize"
          >
            {t('landingPage.diversity.title')}
          </Typography>
          <Typography
            mt="L"
            as="h3"
            variant="normal"
            fontWeight="400"
            textAlign={['center', 'center', 'center', 'unset']}
            fontSize={['1.125rem', '1.125rem', '1.5rem', '1.5rem']}
            lineHeight={['1.625rem', '1.625rem', '2.125rem', '2.125rem']}
          >
            {t('landingPage.diversity.subtitle')}
          </Typography>
          <Typography
            variant="normal"
            textAlign={['center', 'unset']}
            lineHeight={['1.5rem', '2.125rem']}
            mt={['0.625rem', '0.625rem', '1rem', '1rem']}
            mb={['1.25rem', '1.25rem', '1.75rem', '1.75rem']}
            fontSize={['0.875rem', '0.875rem', '1rem', '1rem']}
          >
            {t('landingPage.diversity.description')}
          </Typography>
          <Box mt="M">
            <Button
              width="10rem"
              effect="hover"
              variant="primary"
              onClick={() => push(Routes[RoutesEnum.DEXPool])}
            >
              <Typography
                variant="normal"
                fontSize="inherit"
                fontWeight="inherit"
                textTransform="uppercase"
              >
                {t('common.buy')}
              </Typography>
            </Button>
            <Button
              ml="L"
              width="10rem"
              effect="hover"
              variant="tertiary"
              onClick={() => push(Routes[RoutesEnum.DEXPool])}
            >
              <Typography
                variant="normal"
                fontSize="inherit"
                fontWeight="inherit"
                textTransform="uppercase"
              >
                {t('common.mint')}
              </Typography>
            </Button>
          </Box>
        </Box>
        <Box
          maxWidth="30rem"
          position="relative"
          mt={['XXXL', 'XXXL', 'XXXL', 'unset']}
        >
          <Box
            transform="translateZ(0)"
            filter="drop-shadow(-2px 50px 10px #0002)"
          >
            <ResponsiveImage
              width="100%"
              alt="Platform"
              path="home/diversity-base"
            />
          </Box>
          <BAYCOrbit
            top="30%"
            left="38%"
            width="24%"
            position="absolute"
            filter="drop-shadow(-2px 50px 10px #0002)"
          >
            <ResponsiveImage
              alt="iBAYC"
              width="100%"
              path="home/diversity-iBAYC"
            />
          </BAYCOrbit>
          <TSLAOrbit
            top="30%"
            left="38%"
            width="24%"
            position="absolute"
            filter="drop-shadow(-2px 50px 10px #0002)"
          >
            <ResponsiveImage
              alt="iTSLA"
              width="100%"
              path="home/diversity-iTSLA"
            />
          </TSLAOrbit>
          <EUROrbit
            top="30%"
            left="38%"
            width="24%"
            position="absolute"
            filter="drop-shadow(-2px 50px 10px #0002)"
          >
            <ResponsiveImage
              alt="iEUR"
              width="100%"
              path="home/diversity-iEUR"
            />
          </EUROrbit>
          <BRLOrbit
            top="30%"
            left="38%"
            width="24%"
            position="absolute"
            filter="drop-shadow(-2px 50px 10px #0002)"
          >
            <ResponsiveImage
              alt="iBRL"
              width="100%"
              path="home/diversity-iBRL"
            />
          </BRLOrbit>
          <OILOrbit
            top="30%"
            left="38%"
            width="24%"
            position="absolute"
            filter="drop-shadow(-2px 50px 10px #0002)"
          >
            <ResponsiveImage
              alt="iOIL"
              width="100%"
              path="home/diversity-iOIL"
            />
          </OILOrbit>
          <XAUOrbit
            top="30%"
            left="38%"
            width="24%"
            position="absolute"
            filter="drop-shadow(-2px 50px 10px #0002)"
          >
            <ResponsiveImage
              alt="iXAU"
              width="100%"
              path="home/diversity-iXAU"
            />
          </XAUOrbit>
        </Box>
      </Container>
    </Box>
  );
};

export default Diversity;
