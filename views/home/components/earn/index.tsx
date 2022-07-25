import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import Container from '@/components/container';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Button, ResponsiveImage, Typography } from '@/elements';

import { LEND_AND_BORROW_TOKENS } from './earn.data';
import { FloatingDisk, OrbitCoin } from './earn-animations';
import LendAndBorrowTokens from './earn-tokens';

const Earn: FC = () => {
  const { push } = useRouter();

  return (
    <Box
      as="section"
      position="relative"
      mt={['-4rem', 'L', 'XL', 'NONE']}
      backgroundImage={[
        'linear-gradient(180deg, rgba(248, 248, 248, 0) 0%, #F0F0F0 33.7%)',
        'linear-gradient(180deg, rgba(248, 248, 248, 0) 0%, #F0F0F0 33.7%)',
        'linear-gradient(180deg, rgba(248, 248, 248, 0) 0%, #F0F0F0 33.7%)',
        'linear-gradient(180deg, rgba(248, 248, 248, 0) 0%, #F0F0F0 5.5rem)',
      ]}
    >
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
            mx={['L', 'XXXL']}
            position="relative"
            mt={['XXXL', 'XXXL', 'XXXL', 'unset']}
            width={['auto', 'auto', 'auto', '50%']}
          >
            <FloatingDisk
              transform="translateZ(0)"
              delay={~~(Math.random() * 1500)}
              filter="drop-shadow(-2px 50px 10px #0002)"
            >
              <ResponsiveImage alt="Disk" width="100%" path="home/earn-disk" />
            </FloatingDisk>
            <OrbitCoin
              x="60%"
              y="-180%"
              top="30%"
              left="35%"
              width="32%"
              position="absolute"
              filter="drop-shadow(10px 40px 2px #0003)"
            >
              <ResponsiveImage
                width="100%"
                alt="LINKxBNB LP Token"
                path="home/earn-LINKxBNB"
              />
            </OrbitCoin>
            <OrbitCoin
              x="0%"
              y="230%"
              top="30%"
              left="35%"
              width="32%"
              position="absolute"
              filter="drop-shadow(10px 40px 2px #0003)"
            >
              <ResponsiveImage
                width="100%"
                alt="ADAxBNB LP Token"
                path="home/earn-ADAxBNB"
              />
            </OrbitCoin>
            <OrbitCoin
              x="-120%"
              y="100%"
              top="30%"
              left="35%"
              width="32%"
              position="absolute"
              filter="drop-shadow(10px 40px 2px #0003)"
            >
              <ResponsiveImage
                width="100%"
                alt="SOLxBNB LP Token"
                path="home/earn-SolanaxBNB"
              />
            </OrbitCoin>
            <OrbitCoin
              x="-20%"
              y="-140%"
              top="30%"
              left="35%"
              width="32%"
              position="absolute"
              filter="drop-shadow(10px 40px 2px #0003)"
            >
              <ResponsiveImage
                width="100%"
                alt="USDCxUSDT LP Token"
                path="home/earn-USDCxUSDT"
              />
            </OrbitCoin>
            <OrbitCoin
              x="-120%"
              y="-80%"
              top="30%"
              left="35%"
              width="32%"
              position="absolute"
              filter="drop-shadow(10px 40px 2px #0003)"
            >
              <ResponsiveImage
                width="100%"
                alt="DAIxETH LP Token"
                path="home/earn-DAIxETH"
              />
            </OrbitCoin>
            <OrbitCoin
              x="50%"
              y="40%"
              top="30%"
              left="35%"
              width="32%"
              position="absolute"
              filter="drop-shadow(10px 20px 2px #0004)"
            >
              <ResponsiveImage
                width="100%"
                alt="USDC-ETH"
                path="home/earn-USDCxETH"
              />
            </OrbitCoin>
          </Box>
          <Box
            pr="1.5rem"
            display="flex"
            bg="foreground"
            borderRadius="M"
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
            >
              Earn
            </Typography>
            <Typography
              as="h3"
              variant="normal"
              fontWeight="500"
              textAlign={['center', 'unset']}
              fontSize={['1.125rem', '1.125rem', '1.5rem', '1.5rem']}
              lineHeight={['1.625rem', '1.625rem', '2.125rem', '2.125rem']}
            >
              Get LP Tokens by providing liquidity to our DEX
            </Typography>
            <Typography
              variant="normal"
              textAlign={['center', 'unset']}
              lineHeight={['1.5rem', '2.125rem']}
              mt={['0.625rem', '0.625rem', '1rem', '1rem']}
              mb={['1.25rem', '1.25rem', '1.75rem', '1.75rem']}
              fontSize={['0.875rem', '0.875rem', '1rem', '1rem']}
            >
              Use LP Tokens to earn trading fees and farm $Int Tokens.
            </Typography>
            <Typography variant="normal" fontWeight="700" mb="0.625rem">
              Type of tokens you can use:
            </Typography>
            <Box
              display="flex"
              flexWrap="wrap"
              width={['18rem', '100%']}
              justifyContent={['center', 'center', 'center', 'unset']}
            >
              {LEND_AND_BORROW_TOKENS.map((icons) => (
                <LendAndBorrowTokens icons={icons} key={v4()} />
              ))}
            </Box>
            <Button
              disabled
              bg="disabled"
              variant="primary"
              cursor="not-allowed"
              mt={['1.25rem', '1.25rem', '1.25rem', '3rem']}
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
                Soon
              </Typography>
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Earn;
