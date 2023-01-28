import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { v4 } from 'uuid';

import Container from '@/components/container';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Button, ResponsiveImage, Typography } from '@/elements';
import { TTranslatedMessage } from '@/interface';
import { TickSVG } from '@/svg';

import { REASONS_LIST } from './why-us.data';
import {
  BinanceOrbit,
  BitcoinOrbit,
  EtherOrbit,
  TetherOrbit,
  USDCxETHOrbit,
} from './why-us-animations';

const WhyUs: FC = () => {
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
            height="100%"
            position="relative"
            mt={['XXXL', 'XXXL', 'XXXL', 'unset']}
            mr={['unset', 'unset', 'unset', 'XL']}
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
          <Box
            pr="1.5rem"
            display="flex"
            flexDirection="column"
            width={['100%', '100%', '28rem']}
            pl={['1.25rem', '1.25rem', '3.75rem', '3.75rem']}
            pt={['1.875rem', '1.875rem', '1.875rem', '5rem']}
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
              mb="XL"
            >
              {t('landingPage.whyUs.title')}
            </Typography>
            {REASONS_LIST.map((item) => (
              <Box key={v4()} display="flex" alignItems="center">
                <Box minWidth="1.5rem">
                  <TickSVG maxWidth="1.5rem" maxHeight="1.5rem" />
                </Box>
                <Typography
                  ml="L"
                  variant="normal"
                  fontWeight="600"
                  fontSize="1.125rem"
                >
                  {t(item as TTranslatedMessage)}
                </Typography>
              </Box>
            ))}
            <Button
              effect="hover"
              variant="primary"
              mt={['1.25rem', '1.25rem', '1.25rem', '3rem']}
              onClick={() => push(Routes[RoutesEnum.DEXPool])}
            >
              <Typography
                variant="normal"
                fontSize="inherit"
                fontWeight="inherit"
                textTransform="uppercase"
              >
                {t('landingPage.earnSectionButton')}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default WhyUs;
