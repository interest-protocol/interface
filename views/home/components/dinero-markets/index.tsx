import { useRouter } from 'next/router';
import { FC } from 'react';

import { Container } from '@/components';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Button, Typography } from '@/elements';

import { FloatingCoins } from './dinero-markets-animations';

const DineroMarkets: FC = () => {
  const { push } = useRouter();

  return (
    <Box bg="background" pb={['5.25rem', '2.75rem']}>
      <Container
        py="L"
        display="flex"
        alignItems="center"
        flexDirection={['column', 'column', 'column', 'row']}
        justifyContent={['center', 'center', 'center', 'space-between']}
      >
        <Box
          maxWidth="587px"
          width="100%"
          ml={['none', 'none', '8.438rem', '8.438rem']}
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
            lineHeight={['2.743rem', '2.743rem', '4.876rem', '4.876rem']}
            fontSize={['2.25rem', '2.25rem', '4rem', '4rem']}
            mt="0.75rem"
            textTransform="capitalize"
          >
            Make your LP tokens liquid
          </Typography>
          <Typography
            as="h3"
            variant="normal"
            mb={['0.625rem', '0.625rem', '1rem', '1rem']}
            fontSize={['1.125rem', '1.125rem', '1.5rem', '1.5rem']}
            lineHeight="2.125rem"
            fontWeight="normal"
          >
            Pay $0 to borrow Dinero
          </Typography>
          <Typography
            variant="normal"
            mb={['1.25rem', '1.25rem', '1.563rem', '1.563rem']}
            lineHeight={['1.5rem', '1.5rem', '2.125rem', '2.125rem']}
            maxWidth="540px"
            width="100%"
            fontSize={['0.875rem', '0.875rem', '1rem', '1rem']}
          >
            Borrow $DNR using your LP Tokens as collateral to meet your
            financial needs without losing farming rewards.
          </Typography>
          <Button
            effect="hover"
            variant="primary"
            onClick={() => push(Routes[RoutesEnum.Borrow])}
          >
            BORROW
          </Button>
        </Box>
        <Box
          mt={['XL', 'NONE']}
          maxWidth={['100%', '50%']}
          height={['35rem', '55rem']}
        >
          <Box position="absolute" width="12rem" height="12rem">
            <Box position="relative" height="100%" width="100%">
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
          </Box>
          <img
            height="100%"
            src="/dinero-market.png"
            alt="dinero market flow"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default DineroMarkets;
