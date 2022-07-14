import { useRouter } from 'next/router';
import { FC } from 'react';

import { Container } from '@/components';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Button, Typography } from '@/elements';

import {
  BTCOrbit,
  DAIxUSDCOrbit,
  FloatingCoins,
  SUSHIxCAKEOrbit,
  VUSDCOrbit,
} from './dinero-markets-animations';

const DineroMarkets: FC = () => {
  const { push } = useRouter();

  return (
    <Box bg="#F0F0F0" pb={['5.25rem', '5.25rem', '5.25rem', '2.75rem']}>
      <Container
        py="L"
        display="flex"
        alignItems="center"
        flexDirection={['column', 'column', 'column', 'row']}
        justifyContent={['center', 'center', 'center', 'space-between']}
      >
        <Box
          position="relative"
          zIndex={1}
          maxWidth="587px"
          width="100%"
          ml={['none', 'none', 'none', '8.438rem']}
          display="flex"
          flexDirection="column"
          alignItems={['center', 'center', 'center', 'unset']}
          textAlign={['center', 'center', 'center', 'unset']}
        >
          <Typography
            as="h2"
            variant="normal"
            fontStyle="normal"
            fontWeight="900"
            lineHeight={['2.743rem', '2.743rem', '2.743rem', '4.876rem']}
            fontSize={['2.25rem', '2.25rem', '2.25rem', '4rem']}
            my="0.75rem"
            textTransform="capitalize"
          >
            Make your LP tokens liquid
          </Typography>
          <Typography
            as="h3"
            variant="normal"
            mb={['0.625rem', '0.625rem', '0.625rem', '1rem']}
            fontSize={['1.125rem', '1.125rem', '1.125rem', '1.5rem']}
            lineHeight="2.125rem"
            fontWeight="normal"
          >
            Pay $0 to borrow Dinero
          </Typography>
          <Typography
            variant="normal"
            mb={['1.25rem', '1.25rem', '1.25rem', '1.563rem']}
            lineHeight={['1.5rem', '1.5rem', '1.5rem', '2.125rem']}
            maxWidth="540px"
            width="100%"
            fontSize={['0.875rem', '0.875rem', '0.875rem', '1rem']}
          >
            Borrow $DNR using your LP Tokens as collateral to meet your
            financial needs without losing farming rewards.
          </Typography>
          <Button
            effect="hover"
            variant="primary"
            mb="XL"
            onClick={() => push(Routes[RoutesEnum.Borrow])}
          >
            BORROW
          </Button>
        </Box>
        <Box
          height="60rem"
          display="flex"
          mt={['XL', 'NONE']}
          justifyContent="center"
          minWidth={['100%', '100%', '50%']}
        >
          <Box
            mx="auto"
            width="100%"
            height="30rem"
            maxWidth="30rem"
            position="absolute"
          >
            <Box position="relative" height="40%" width="40%" mx="auto">
              <FloatingCoins
                top="12%"
                left="7%"
                width="52%"
                position="absolute"
                delay={~~(Math.random() * 1500)}
              >
                <img
                  width="100%"
                  alt="dinero market flow"
                  src="/dinero-collateral-SUSHIxCAKE.png"
                />
              </FloatingCoins>
              <FloatingCoins
                width="40%"
                position="absolute"
                left="60%"
                delay={~~(Math.random() * 1500)}
              >
                <img
                  width="100%"
                  alt="dinero market flow"
                  src="/dinero-collateral-BTC.png"
                />
              </FloatingCoins>
              <FloatingCoins
                width="52%"
                position="absolute"
                top="40%"
                left="48%"
                delay={~~(Math.random() * 1500)}
              >
                <img
                  width="100%"
                  alt="dinero market flow"
                  src="/dinero-collateral-DAIxUSDC.png"
                />
              </FloatingCoins>
              <FloatingCoins
                width="40%"
                position="absolute"
                top="50%"
                delay={~~(Math.random() * 1500)}
              >
                <img
                  width="100%"
                  alt="dinero market flow"
                  src="/dinero-collateral-vUSDC.png"
                />
              </FloatingCoins>
            </Box>
            <Typography variant="normal" textAlign="center">
              Collateral
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
                <Typography textAlign="center" variant="normal" mb="XL">
                  Market
                </Typography>
                <Box
                  position="absolute"
                  filter="drop-shadow(-2px 40px 10px #0002)"
                >
                  <img
                    width="100%"
                    alt="dinero market base"
                    src="/dinero-market-base.png"
                  />
                </Box>
                <SUSHIxCAKEOrbit
                  top="38%"
                  left="27%"
                  width="50%"
                  position="absolute"
                  filter="drop-shadow(-2px 30px 10px #0002)"
                >
                  <img
                    width="100%"
                    alt="dinero market SUSHI x CAKE"
                    src="/dinero-market-SUSHIxCAKE.png"
                  />
                </SUSHIxCAKEOrbit>
                <BTCOrbit
                  top="38%"
                  left="35%"
                  width="35%"
                  position="absolute"
                  filter="drop-shadow(-2px 30px 10px #0002)"
                >
                  <img
                    width="100%"
                    alt="dinero market BTC"
                    src="/dinero-market-BTC.png"
                  />
                </BTCOrbit>
                <VUSDCOrbit
                  top="38%"
                  left="35%"
                  width="35%"
                  position="absolute"
                  filter="drop-shadow(-2px 30px 10px #0002)"
                >
                  <img
                    width="100%"
                    alt="dinero market vUSDC"
                    src="/dinero-market-vUSDC.png"
                  />
                </VUSDCOrbit>
                <DAIxUSDCOrbit
                  top="38%"
                  left="27%"
                  width="50%"
                  position="absolute"
                  filter="drop-shadow(-2px 30px 10px #0002)"
                >
                  <img
                    width="100%"
                    alt="dinero market DAI x USDC"
                    src="/dinero-market-DAIxUSDC.png"
                  />
                </DAIxUSDCOrbit>
              </Box>
              <Box width="30%">
                <img
                  width="100%"
                  alt="dinero market flow"
                  src="/dinero-persona.png"
                />
                <Typography textAlign="center" variant="normal">
                  Borrower
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
                  ml="XXL"
                  width="40%"
                  delay={~~(Math.random() * 1500)}
                >
                  <img src="/dinero-DNR.png" alt="Borrow Dinero" width="100%" />
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
                <img
                  src="/dinero-INT-top.png"
                  alt="Interest Token"
                  width="100%"
                />
              </FloatingCoins>
              <FloatingCoins
                top="40%"
                width="45%"
                position="absolute"
                delay={~~(Math.random() * 1500)}
              >
                <img
                  src="/dinero-INT-left.png"
                  alt="Interest Token"
                  width="100%"
                />
              </FloatingCoins>
              <FloatingCoins
                top="40%"
                left="60%"
                width="45%"
                position="absolute"
                delay={~~(Math.random() * 1500)}
              >
                <img
                  src="/dinero-INT-right.png"
                  alt="Interest Token"
                  width="100%"
                />
              </FloatingCoins>
            </Box>
            <Typography variant="normal" textAlign="center">
              Earn $INT tokens
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default DineroMarkets;
