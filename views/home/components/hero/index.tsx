import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { Box, Button, ResponsiveImage, Typography } from '@/elements';

import { FloatingCoins } from './hero-animations';

const Hero: FC = () => {
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
          width={['100%', '100%', '100%', '35rem']}
          alignItems={['center', 'center', 'center', 'unset']}
          key={v4()}
        >
          <Typography
            as="h2"
            variant="normal"
            fontWeight="900"
            fontStyle="normal"
            textTransform="capitalize"
            textAlign={['center', 'center', 'center', 'unset']}
            fontSize={['2.75rem', '2.75rem', '4rem', '4rem']}
            lineHeight={['3.353rem', '3.353rem', '4.876rem', '4.876rem']}
          >
            {t('landingPage.headerTitle')}
          </Typography>
          <Typography
            mt="0.625rem"
            mb="1.875rem"
            variant="normal"
            lineHeight="30px"
            textAlign={['center', 'unset']}
            fontSize={['1rem', '1rem', '1.5rem', '1.5rem']}
          >
            {t('landingPage.headerSubtitle')}
          </Typography>
          <a
            href="https://docs.interestprotocol.com/"
            target="__blank"
            rel="noopener noreferrer"
          >
            <Button type="button" variant="primary" effect="hover">
              {t('landingPage.headerButton')}
            </Button>
          </a>
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
            top="55%"
            left="19.8%"
            width="20%"
            position="absolute"
            delay={~~(Math.random() * 1500)}
          >
            <ResponsiveImage
              width="100%"
              height="100%"
              alt="Interest Protocol BNBxSUSHI"
              path="home/hero-BNBxSUSHI"
            />
          </FloatingCoins>
          <FloatingCoins
            top="23%"
            left="68%"
            width="20%"
            position="absolute"
            delay={~~(Math.random() * 1500)}
          >
            <ResponsiveImage
              width="100%"
              height="100%"
              alt="Interest Protocol DAIxUSDC"
              path="home/hero-DAIxUSDC"
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
            top="23%"
            left="14%"
            width="20%"
            position="absolute"
            delay={~~(Math.random() * 1500)}
          >
            <ResponsiveImage
              width="100%"
              height="100%"
              alt="Interest Protocol ETHxUSDT"
              path="home/hero-ETHxUSDT"
            />
          </FloatingCoins>
          <FloatingCoins
            top="4%"
            left="39%"
            width="22%"
            position="absolute"
            delay={~~(Math.random() * 1500)}
          >
            <ResponsiveImage
              width="100%"
              height="100%"
              path="home/hero-WBTCxETH"
              alt="Interest Protocol WBTCxETH"
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
              path="home/hero-vUSDC"
              alt="Interest Protocol vUSDC"
            />
          </FloatingCoins>
        </Box>
      </Box>
    </Box>
  );
};
export default Hero;
