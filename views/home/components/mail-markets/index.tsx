import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import Container from '@/components/container';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Button, Typography } from '@/elements';

import { LEND_AND_BORROW_TOKENS } from './mail-markets.data';
import {
  BinanceOrbit,
  BitcoinOrbit,
  EtherOrbit,
  TetherOrbit,
  USDCxETHOrbit,
} from './mail-markets-animations';
import LendAndBorrowTokens from './mail-markets-tokens';

const MailMarkets: FC = () => {
  const { push } = useRouter();

  return (
    <Box
      pt="10rem"
      mt="-10rem"
      position="relative"
      backgroundImage="linear-gradient(180deg, rgba(248, 248, 248, 0) 0%, #F0F0F0 33.83%)"
    >
      <Container as="section" bg={['#EEE', '#EEE', '#EEE', 'transparent']}>
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
            mr={['unset', 'unset', 'unset', 'XXL']}
            width={['100%', '100%', '100%', '50%']}
          >
            <Box filter="drop-shadow(-2px 50px 10px #0002)">
              <img
                width="100%"
                loading="lazy"
                alt="Platform"
                src="/earn-base.png"
              />
            </Box>
            <BitcoinOrbit
              top="32%"
              left="39%"
              width="24%"
              position="absolute"
              filter="drop-shadow(-2px 50px 10px #0002)"
            >
              <img
                alt="BTC"
                width="100%"
                loading="lazy"
                src="/earn-bitcoin.png"
              />
            </BitcoinOrbit>
            <BinanceOrbit
              top="34%"
              left="39%"
              width="22%"
              position="absolute"
              filter="drop-shadow(-2px 50px 10px #0002)"
            >
              <img src="/earn-bnb.png" width="100%" alt="BNB" loading="lazy" />
            </BinanceOrbit>
            <EtherOrbit
              top="30%"
              left="37%"
              width="24%"
              position="absolute"
              filter="drop-shadow(-2px 50px 10px #0002)"
            >
              <img src="/earn-eth.png" width="100%" alt="ETH" loading="lazy" />
            </EtherOrbit>
            <TetherOrbit
              top="32%"
              left="40%"
              width="20%"
              position="absolute"
              filter="drop-shadow(-2px 50px 10px #0002)"
            >
              <img
                width="100%"
                alt="TETHER"
                loading="lazy"
                src="/earn-tether.png"
              />
            </TetherOrbit>
            <USDCxETHOrbit
              top="30%"
              width="35%"
              left="37.5%"
              position="absolute"
              filter="drop-shadow(-2px 50px 10px #0002)"
            >
              <img
                src="/earn-usdc-eth.png"
                alt="USDC-ETH"
                width="100%"
                loading="lazy"
              />
            </USDCxETHOrbit>
          </Box>
          <Box
            width={['100%', '100%', '41.625rem', '41.625rem']}
            bg="foreground"
            borderRadius="M"
            pl={['1.25rem', '1.25rem', '3.75rem', '3.75rem']}
            pr="1.5rem"
            pt={['1.875rem', '1.875rem', '1.875rem', '5rem']}
            pb={['1.875rem', '1.875rem', '1.875rem', '6.063rem']}
            display="flex"
            flexDirection="column"
            alignItems={['center', 'center', 'center', 'unset']}
          >
            <Typography
              variant="normal"
              fontStyle="normal"
              fontWeight="900"
              lineHeight={['2.743rem', '2.743rem', '2.743rem', '4.876rem']}
              fontSize={['2.25rem', '2.25rem', '2.25rem', '4rem']}
              as="h2"
              textAlign={['center', 'unset']}
            >
              Earn
            </Typography>
            <Typography
              variant="normal"
              fontSize={['1.125rem', '1.125rem', '1.5rem', '1.5rem']}
              as="h3"
              fontWeight="500"
              lineHeight={['1.625rem', '1.625rem', '2.125rem', '2.125rem']}
              textAlign={['center', 'unset']}
            >
              Get LP Tokens by providing liquidity to our DEX
            </Typography>
            <Typography
              mt={['0.625rem', '0.625rem', '1rem', '1rem']}
              mb={['1.25rem', '1.25rem', '1.75rem', '1.75rem']}
              fontSize={['0.875rem', '0.875rem', '1rem', '1rem']}
              variant="normal"
              lineHeight={['1.5rem', '2.125rem']}
              textAlign={['center', 'unset']}
            >
              Use LP Tokens to earn trading fees and farm $Int Tokens.
            </Typography>
            <Typography variant="normal" fontWeight="700" mb="0.625rem">
              Type of tokens you can use:
            </Typography>
            <Box
              display="flex"
              justifyContent={['center', 'center', 'center', 'unset']}
              flexWrap="wrap"
              width={['18rem', '100%']}
            >
              {LEND_AND_BORROW_TOKENS.map((icons) => (
                <LendAndBorrowTokens icons={icons} key={v4()} />
              ))}
            </Box>
            <Button
              mt={['1.25rem', '1.25rem', '1.25rem', '3rem']}
              variant="primary"
              bg="#DBDBDA"
              disabled
              cursor="not-allowed"
              onClick={() =>
                push(Routes[RoutesEnum.MAILMarket], undefined, {
                  shallow: true,
                })
              }
            >
              <Typography
                variant="normal"
                textTransform="uppercase"
                fontWeight="700"
                fontSize="0.875rem"
              >
                SOON
              </Typography>
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MailMarkets;
