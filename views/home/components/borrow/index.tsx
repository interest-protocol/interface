import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Container } from '@/components';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Button, ResponsiveImage, Typography } from '@/elements';
import { capitalize } from '@/utils';

import {
  BTCOrbit,
  DAIxUSDCOrbit,
  FloatingCoins,
  SUSHIxCAKEOrbit,
  VUSDCOrbit,
} from './borrow-animations';

const Borrow: FC = () => {
  const t = useTranslations();
  const { push } = useRouter();

  return (
    <Box
      as="section"
      pb={['5.25rem', '5.25rem', '5.25rem', '2.75rem']}
      bg={['#F0F0F0', '#F0F0F0', '#F0F0F0', 'background']}
    >
      <Container
        py="L"
        display="flex"
        alignItems="center"
        flexDirection={['column', 'column', 'column', 'row']}
        justifyContent={['center', 'center', 'center', 'space-between']}
      >
        <Box
          zIndex={1}
          width="100%"
          display="flex"
          maxWidth="587px"
          position="relative"
          ml={['none', 'none', 'none', '8.438rem']}
          flexDirection="column"
          alignItems={['center', 'center', 'center', 'unset']}
          textAlign={['center', 'center', 'center', 'unset']}
        >
          <Typography
            as="h2"
            my="0.75rem"
            variant="normal"
            fontWeight="900"
            fontStyle="normal"
            lineHeight={['2.743rem', '2.743rem', '2.743rem', '4.876rem']}
            fontSize={['2.25rem', '2.25rem', '2.25rem', '2.75rem']}
            textTransform="capitalize"
          >
            {t('landingPage.borrowSectionTitle')}
          </Typography>
          <Typography
            as="h3"
            variant="normal"
            fontWeight="normal"
            lineHeight="2.125rem"
            mb={['0.625rem', '0.625rem', '0.625rem', '1rem']}
            fontSize={['1.125rem', '1.125rem', '1.125rem', '1.5rem']}
          >
            {t('landingPage.borrowSectionSubtitle')}
          </Typography>
          <Typography
            width="100%"
            maxWidth="540px"
            variant="normal"
            mb={['1.25rem', '1.25rem', '1.25rem', '1.563rem']}
            lineHeight={['1.5rem', '1.5rem', '1.5rem', '2.125rem']}
            fontSize={['0.875rem', '0.875rem', '0.875rem', '1rem']}
            textAlign={['center', 'center', 'center', 'justify']}
          >
            {t('landingPage.borrowSectionBody')}
          </Typography>
          <Button
            mb="XL"
            effect="hover"
            variant="primary"
            onClick={() => push(Routes[RoutesEnum.DineroMarket])}
          >
            {capitalize(t('common.borrow'))}
          </Button>
        </Box>
        <Box
          display="flex"
          mt={['XL', 'NONE']}
          justifyContent="center"
          height={['43rem', '60rem']}
          minWidth={['90%', '90%', '50%']}
        >
          <Box
            mx="auto"
            maxWidth="30rem"
            position="absolute"
            width={['20rem', '100%']}
            height={['20rem', '30rem']}
          >
            <Box position="relative" height="40%" width="40%" mx="auto">
              <FloatingCoins
                top="12%"
                left="7%"
                width="52%"
                position="absolute"
                delay={~~(Math.random() * 1500)}
              >
                <ResponsiveImage
                  width="100%"
                  alt="dinero market flow"
                  path="home/dinero-collateral-SUSHIxCAKE"
                />
              </FloatingCoins>
              <FloatingCoins
                width="40%"
                position="absolute"
                left="60%"
                delay={~~(Math.random() * 1500)}
              >
                <ResponsiveImage
                  width="100%"
                  alt="dinero market flow"
                  path="home/dinero-collateral-BTC"
                />
              </FloatingCoins>
              <FloatingCoins
                width="52%"
                position="absolute"
                top="40%"
                left="48%"
                delay={~~(Math.random() * 1500)}
              >
                <ResponsiveImage
                  width="100%"
                  alt="dinero market flow"
                  path="home/dinero-collateral-DAIxUSDC"
                />
              </FloatingCoins>
              <FloatingCoins
                width="40%"
                position="absolute"
                top="50%"
                delay={~~(Math.random() * 1500)}
              >
                <ResponsiveImage
                  width="100%"
                  alt="dinero market flow"
                  path="home/dinero-collateral-vUSDC"
                />
              </FloatingCoins>
            </Box>
            <Typography
              variant="normal"
              textAlign="center"
              textTransform="capitalize"
              fontWeight="bold"
            >
              {t('common.collateral')}
            </Typography>
            <Box color="textSecondary" width="40%" mx="auto" mt="XL">
              <svg viewBox="0 0 245 56" fill="none" width="100%">
                <path d="M0 43.6428L12 55.6428H0V43.6428Z" fill="#0055FF" />
                <path
                  d="M243 51.1428C171.5 -11.8572 88 -16.8572 4.5 51.1428"
                  stroke="#0055FF"
                  strokeWidth="4"
                />
              </svg>
            </Box>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Box width="40%" position="relative">
                <Typography
                  textAlign="center"
                  variant="normal"
                  mb="XL"
                  textTransform="capitalize"
                  fontWeight="bold"
                >
                  {t('common.market')}
                </Typography>
                <Box
                  position="absolute"
                  transform="translateZ(0)"
                  filter="drop-shadow(-2px 40px 10px #0002)"
                >
                  <ResponsiveImage
                    width="100%"
                    alt="dinero market base"
                    path="home/dinero-market-base"
                  />
                </Box>
                <SUSHIxCAKEOrbit
                  top="38%"
                  left="27%"
                  width="50%"
                  position="absolute"
                  filter="drop-shadow(-2px 30px 10px #0002)"
                >
                  <ResponsiveImage
                    width="100%"
                    alt="dinero market SUSHI x CAKE"
                    path="home/dinero-market-SUSHIxCAKE"
                  />
                </SUSHIxCAKEOrbit>
                <BTCOrbit
                  top="38%"
                  left="35%"
                  width="35%"
                  position="absolute"
                  filter="drop-shadow(-2px 30px 10px #0002)"
                >
                  <ResponsiveImage
                    width="100%"
                    alt="dinero market BTC"
                    path="home/dinero-market-BTC"
                  />
                </BTCOrbit>
                <VUSDCOrbit
                  top="38%"
                  left="35%"
                  width="35%"
                  position="absolute"
                  filter="drop-shadow(-2px 30px 10px #0002)"
                >
                  <ResponsiveImage
                    width="100%"
                    alt="dinero market vUSDC"
                    path="home/dinero-market-vUSDC"
                  />
                </VUSDCOrbit>
                <DAIxUSDCOrbit
                  top="38%"
                  left="27%"
                  width="50%"
                  position="absolute"
                  filter="drop-shadow(-2px 30px 10px #0002)"
                >
                  <ResponsiveImage
                    width="100%"
                    alt="dinero market DAI x USDC"
                    path="home/dinero-market-DAIxUSDC"
                  />
                </DAIxUSDCOrbit>
              </Box>
              <Box width="30%">
                <ResponsiveImage
                  width="100%"
                  alt="dinero market flow"
                  path="home/dinero-persona"
                />
                <Typography
                  textAlign="center"
                  variant="normal"
                  textTransform="capitalize"
                  fontWeight="bold"
                >
                  {t('common.borrower')}
                </Typography>
              </Box>
            </Box>
            <Box color="textSecondary" width="40%" mx="auto">
              <svg viewBox="0 0 245 56" fill="none" width="100%">
                <path d="M245 12L233 0H245V12Z" fill="#0055FF" />
                <path
                  d="M2 4.5C73.5 67.5 157 72.5 240.5 4.5"
                  stroke="#0055FF"
                  strokeWidth="4"
                />
              </svg>
            </Box>
            <Box
              mt="-10%"
              display="flex"
              color="textSecondary"
              justifyContent="space-evenly"
            >
              <Box width="25%">
                <svg viewBox="0 0 136 247" fill="none" width="100%">
                  <path
                    d="M123.851 231.902L130.907 216.467L135.096 227.713L123.851 231.902Z"
                    fill="#0055FF"
                  />
                  <path
                    d="M46.0508 1.57079C11.9741 90.5654 36.4378 170.558 129.309 225.067"
                    stroke="#0055FF"
                    strokeWidth="4"
                  />
                </svg>
              </Box>
              <Box width="40%" mt="10%">
                <Box display="flex" alignItems="center" justifyContent="center">
                  <FloatingCoins
                    width="4.5rem"
                    delay={~~(Math.random() * 1500)}
                  >
                    <ResponsiveImage
                      width="100%"
                      alt="Borrow Dinero"
                      path="home/dinero-DNR"
                    />
                  </FloatingCoins>
                  <Typography variant="normal" ml="L" fontWeight="bold">
                    Dinero
                  </Typography>
                </Box>
                <Box mx="auto" position="relative" height="100%" mt="25%">
                  <FloatingCoins
                    left="30%"
                    width="45%"
                    position="absolute"
                    delay={~~(Math.random() * 1500)}
                  >
                    <ResponsiveImage
                      width="100%"
                      alt="Interest Token"
                      path="home/dinero-INT-top"
                    />
                  </FloatingCoins>
                  <FloatingCoins
                    top="40%"
                    width="45%"
                    position="absolute"
                    delay={~~(Math.random() * 1500)}
                  >
                    <ResponsiveImage
                      width="100%"
                      alt="Interest Token"
                      path="home/dinero-INT-left"
                    />
                  </FloatingCoins>
                  <FloatingCoins
                    top="40%"
                    left="60%"
                    width="45%"
                    position="absolute"
                    delay={~~(Math.random() * 1500)}
                  >
                    <ResponsiveImage
                      width="100%"
                      alt="Interest Token"
                      path="home/dinero-INT-right"
                    />
                  </FloatingCoins>
                </Box>
                <Typography
                  variant="normal"
                  textAlign="center"
                  textTransform="capitalize"
                  fontWeight="bold"
                >
                  {t('landingPage.borrowSectionINTTokensDescription')}
                </Typography>
              </Box>
              <Box width="25%">
                <svg viewBox="0 0 136 247" fill="none" width="100%">
                  <path
                    d="M11.2454 231.902L4.18945 216.468L0.000366569 227.713L11.2454 231.902Z"
                    fill="#0055FF"
                  />
                  <path
                    d="M89.0459 1.57091C123.123 90.5655 98.6589 170.558 5.7878 225.067"
                    stroke="#0055FF"
                    strokeWidth="4"
                  />
                </svg>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Borrow;
