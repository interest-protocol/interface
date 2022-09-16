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
            fontSize={['2.25rem', '2.25rem', '2.25rem', '4rem']}
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
            >
              {t('common.collateral')}
            </Typography>
            <Box color="textSecondary" width="40%" mx="auto" mt="XL">
              <svg viewBox="0 0 162 43" fill="none" width="100%">
                <path
                  d="M161.618 37.9092C134.465 9.28866 64.4184 -30.0096 1.45312 41.762M1.45312 41.762V33.6475M1.45312 41.762H9.66195"
                  stroke="currentColor"
                  strokeWidth="1.05192"
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
                >
                  {t('common.borrower')}
                </Typography>
              </Box>
            </Box>
            <Box color="textSecondary" width="40%" mx="auto">
              <svg viewBox="0 0 162 43" fill="none" width="100%">
                <path
                  d="M0.836679 4.7276C27.9896 33.3482 98.0367 72.6464 161.002 0.87484M161.002 0.87484L161.002 8.98934M161.002 0.87484L152.793 0.874839"
                  stroke="currentColor"
                  strokeWidth="1.05192"
                />
              </svg>
            </Box>
            <Box
              mt="-10%"
              display="flex"
              color="textSecondary"
              justifyContent="space-evenly"
            >
              <Box width="10%">
                <svg viewBox="0 0 53 224" fill="none" width="100%">
                  <path
                    d="M25.3606 0.264832C-3.15053 58.9641 -17.8796 122.76 49.0531 222.972M49.0531 222.972L39.1602 220.321M49.0531 222.972L51.7348 212.964"
                    stroke="black"
                    strokeWidth="1.05192"
                  />
                </svg>
              </Box>
              <Box width="40%" display="flex" alignItems="center">
                <FloatingCoins
                  width="40%"
                  ml={['NONE', 'XXL']}
                  delay={~~(Math.random() * 1500)}
                >
                  <ResponsiveImage
                    width="100%"
                    alt="Borrow Dinero"
                    path="home/dinero-DNR"
                  />
                </FloatingCoins>
                <Typography variant="normal" ml="L">
                  Dinero
                </Typography>
              </Box>
              <Box width="10%">
                <svg viewBox="0 0 54 224" fill="none" widths="100%">
                  <path
                    d="M0.953139 222.878C43.7044 173.575 74.4657 115.776 35.7946 1.64096M35.7946 1.64096L44.6624 6.76537M35.7946 1.64096L30.6106 10.6119"
                    stroke="black"
                    strokeWidth="1.05192"
                  />
                </svg>
              </Box>
            </Box>
            <Box mx="auto" position="relative" width="40%" height="40%">
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
            >
              {t('landingPage.borrowSectionINTTokensDescription')}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Borrow;
