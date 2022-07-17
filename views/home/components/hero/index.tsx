import { always } from 'ramda';
import { FC } from 'react';

import { Container } from '@/components';
import { Box, Button, ResponsiveImage, Typography } from '@/elements';

import { FloatingCoins } from './hero-animations';

const Hero: FC = always(
  <Box
    pb="10rem"
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
      minHeight={['unset', 'unset', 'unset', '100vh']}
      pt={['11.813rem', '11.813rem', '11.813rem', 'XXXL']}
    >
      <Box
        zIndex={2}
        display="flex"
        position="relative"
        flexDirection="column"
        ml={['none', 'none', 'none', '8.438rem']}
        width={['100%', '100%', '100%', '45.938rem']}
        alignItems={['center', 'center', 'center', 'unset']}
      >
        <Typography
          as="h2"
          variant="normal"
          fontWeight="900"
          fontStyle="normal"
          textTransform="capitalize"
          textAlign={['center', 'unset']}
          fontSize={['2.75rem', '2.75rem', '4rem', '4rem']}
          lineHeight={['3.353rem', '3.353rem', '4.876rem', '4.876rem']}
        >
          Borrow Dinero for free
        </Typography>
        <Typography
          mt="0.625rem"
          mb="1.875rem"
          variant="normal"
          lineHeight="30px"
          textAlign={['center', 'unset']}
          fontSize={['1rem', '1rem', '1.5rem', '1.5rem']}
        >
          Dinero is an overcollateralized stablecoin
        </Typography>
        <a href="https://docs.interestprotocol.com/" target="__blank">
          <Button type="button" variant="primary" effect="hover">
            Read Docs
          </Button>
        </a>
      </Box>
    </Container>
    <Box
      right="0"
      top="8rem"
      mt={['3rem', '3rem', '3rem', 'unset']}
      width={['100%', '100%', '100%', '52%']}
      height={['20rem', '20rem', '20rem', 'unset']}
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

export default Hero;
