import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Container } from '@/components';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Button, ResponsiveImage, Typography } from '@/elements';

import { FloatingCoins } from './hero-animations';

const Hero: FC = () => {
  const { push } = useRouter();
  const t = useTranslations();

  return (
    <Box
      as="section"
      backgroundImage={[
        'linear-gradient(105.71deg, #EEEEEE -1.51%, #E8E8E8 20.1%, #DBDBDA 72.59%);',
        'none',
      ]}
    >
      <Container
        display="flex"
        position="relative"
        alignItems="center"
        justifyContent={['center', 'center', 'center', 'flex-start']}
        height={['unset', 'unset', 'unset', '100vh']}
        minHeight={['unset', 'unset', 'unset', '45rem']}
        pt={['11.813rem', '11.813rem', '11.813rem', 'XXXL']}
      >
        <Box
          zIndex={2}
          display="flex"
          position="relative"
          flexDirection="column"
          ml={['none', 'none', 'none', '8.438rem']}
          textAlign={['center', 'center', 'center', 'left']}
          width={['20.313rem', '20.313rem', '100%', '40rem']}
          alignItems={['center', 'center', 'center', 'flex-start']}
        >
          <Typography
            as="h2"
            variant="normal"
            fontWeight="900"
            fontStyle="normal"
            textTransform="capitalize"
            fontSize={['2.75rem', '2.75rem', '2.75rem', '2.75rem']}
            lineHeight={['3.353rem', '3.353rem', '3.75rem', '3.75rem']}
          >
            {t.rich('landingPage.headerTitle', {
              // eslint-disable-next-line react/display-name
              special: (chunks) => (
                <Typography
                  as="span"
                  color="accent"
                  variant="normal"
                  fontWeight="900"
                  fontStyle="normal"
                  textTransform="capitalize"
                  fontSize={['2.75rem', '2.75rem', '2.75rem', '2.75rem']}
                  lineHeight={['3.353rem', '3.353rem', '3.75rem', '3.75rem']}
                >
                  {chunks}
                </Typography>
              ),
            })}
          </Typography>
          <Typography
            mt="0.625rem"
            mb="1.875rem"
            variant="normal"
            lineHeight="30px"
            fontSize={['1rem', '1rem', '1.125rem', '1.125rem']}
          >
            {t('landingPage.headerSubtitle')}
          </Typography>
          <Button
            type="button"
            variant="primary"
            effect="hover"
            onClick={() => push(Routes[RoutesEnum.DEX])}
          >
            {t('landingPage.headerButton')}
          </Button>
        </Box>
      </Container>
      <Box
        right="0"
        top="8rem"
        pb={['8rem', '6rem', '4rem', 'unset']}
        mt={['3rem', '3rem', '3rem', 'unset']}
        width={['100%', '100%', '100%', '52%']}
        position={['static', 'static', 'static', 'absolute']}
      >
        <Box
          height="100%"
          position="relative"
          minWidth={['100%', '100%', '100%', '50rem']}
          maxWidth={['100%', '100%', '100%', '80rem']}
        >
          <Box
            pt="15%"
            minWidth={['100%', '100%', '100%', '50rem']}
            maxWidth={['100%', '100%', '100%', '80rem']}
          >
            <ResponsiveImage
              width="100%"
              height="100%"
              alt="Interest Protocol Platform"
              path="home/hero-base"
            />
          </Box>
          <FloatingCoins
            top="58%"
            left="22.8%"
            width="12%"
            position="absolute"
            delay={~~(Math.random() * 1500)}
          >
            <ResponsiveImage
              width="100%"
              height="100%"
              alt="Interest Protocol XAU"
              path="home/hero-iXAU"
            />
          </FloatingCoins>
          <FloatingCoins
            top="25%"
            left="70.5%"
            width="12%"
            position="absolute"
            delay={~~(Math.random() * 1500)}
          >
            <ResponsiveImage
              width="100%"
              height="100%"
              alt="Interest Protocol GBP"
              path="home/hero-iGBP"
            />
          </FloatingCoins>
          <FloatingCoins
            top="33%"
            left="43%"
            width="14%"
            position="absolute"
            delay={~~(Math.random() * 1500)}
          >
            <ResponsiveImage
              width="100%"
              height="100%"
              alt="Interest Protocol DNR"
              path="home/hero-DNR"
            />
          </FloatingCoins>
          <FloatingCoins
            top="27%"
            left="18%"
            width="12%"
            position="absolute"
            delay={~~(Math.random() * 1500)}
          >
            <ResponsiveImage
              width="100%"
              height="100%"
              alt="Interest Protocol TSLA"
              path="home/hero-iTSLA"
            />
          </FloatingCoins>
          <FloatingCoins
            top="8%"
            left="44%"
            width="12%"
            position="absolute"
            delay={~~(Math.random() * 1500)}
          >
            <ResponsiveImage
              width="100%"
              height="100%"
              path="home/hero-iAAPL"
              alt="Interest Protocol Apple"
            />
          </FloatingCoins>
          <FloatingCoins
            top="62%"
            left="68%"
            width="12%"
            position="absolute"
            delay={~~(Math.random() * 1500)}
          >
            <ResponsiveImage
              width="100%"
              height="100%"
              path="home/hero-iBAYC"
              alt="Interest Protocol BAYC"
            />
          </FloatingCoins>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
