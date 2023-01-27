import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

import Container from '@/components/container';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Button, ResponsiveImage, Typography } from '@/elements';

import {
  BinanceOrbit,
  BitcoinOrbit,
  EtherOrbit,
  TetherOrbit,
  USDCxETHOrbit,
} from './earn-animations';

const Diversity: FC = () => {
  const { push } = useRouter();
  const t = useTranslations();

  return (
    <Box as="section" position="relative" mt={['-4rem', 'L', 'XL', 'NONE']}>
      <Container>
        <Box
          display="flex"
          alignItems="center"
          py={['XXL', 'XXL', 'XXL', 'XXXL']}
          mt={['-5rem', '-5rem', '-5rem', 'NONE']}
          justifyContent="space-around"
          flexDirection={[
            'column-reverse',
            'column-reverse',
            'column-reverse',
            'row',
          ]}
        >
          <Box
            pr="1.5rem"
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
              fontSize={['2.25rem', '2.25rem', '2.25rem', '4rem']}
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
            height="100%"
            position="relative"
            mt={['XXXL', 'XXXL', 'XXXL', 'unset']}
            mr={['unset', 'unset', 'unset', 'XXL']}
            width={['100%', '100%', '100%', '50%']}
          >
            <Box
              transform="translateZ(0)"
              filter="drop-shadow(-2px 50px 10px #0002)"
            >
              <ResponsiveImage
                width="100%"
                alt="Platform"
                path="home/earn-base"
              />
            </Box>
            <BitcoinOrbit
              top="32%"
              left="39%"
              width="24%"
              position="absolute"
              filter="drop-shadow(-2px 50px 10px #0002)"
            >
              <ResponsiveImage
                alt="BTC"
                width="100%"
                path="home/earn-bitcoin"
              />
            </BitcoinOrbit>
            <BinanceOrbit
              top="34%"
              left="39%"
              width="22%"
              position="absolute"
              filter="drop-shadow(-2px 50px 10px #0002)"
            >
              <ResponsiveImage alt="BNB" width="100%" path="home/earn-bnb" />
            </BinanceOrbit>
            <EtherOrbit
              top="30%"
              left="37%"
              width="24%"
              position="absolute"
              filter="drop-shadow(-2px 50px 10px #0002)"
            >
              <ResponsiveImage alt="ETH" width="100%" path="home/earn-eth" />
            </EtherOrbit>
            <TetherOrbit
              top="32%"
              left="40%"
              width="20%"
              position="absolute"
              filter="drop-shadow(-2px 50px 10px #0002)"
            >
              <ResponsiveImage
                alt="USDT"
                width="100%"
                path="home/earn-tether"
              />
            </TetherOrbit>
            <USDCxETHOrbit
              top="30%"
              width="35%"
              left="37.5%"
              position="absolute"
              filter="drop-shadow(-2px 50px 10px #0002)"
            >
              <ResponsiveImage
                width="100%"
                alt="USDC-ETH"
                path="home/earn-usdc-eth"
              />
            </USDCxETHOrbit>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Diversity;
