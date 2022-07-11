import { useRouter } from 'next/router';
import { FC } from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { v4 } from 'uuid';

import Container from '@/components/container';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Button, Typography } from '@/elements';

import { LEND_AND_BORROW_TOKENS } from './mail-markets.data';
import LendAndBorrowTokens from './mail-markets-tokens';

const MailMarkets: FC = () => {
  const { push } = useRouter();

  return (
    <Container as="section" bg={['#EEE', 'transparent']}>
      <Box
        mt="-20rem"
        display="flex"
        alignItems="center"
        py={['XXL', 'XXXL']}
        justifyContent="space-around"
        flexDirection={['column-reverse', 'row']}
      >
        <Box width={['100%', '50%']}>
          <AnimationOnScroll delay={1000} animateIn="animate__fadeInBottomLeft">
            <img src="/token-disk.png" width="100%" alt="Tokens Ecosystem" />
          </AnimationOnScroll>
        </Box>
        <AnimationOnScroll delay={500} animateIn="animate__flipInX">
          <Box
            width={['100%', '100%', '41.625rem', '41.625rem']}
            bg="foreground"
            borderRadius="M"
            pl={['1.25rem', '1.25rem', '3.75rem', '3.75rem']}
            pr="1.5rem"
            pt={['1.875rem', '1.875rem', '5rem', '5rem']}
            pb={['1.875rem', '1.875rem', '6.063rem', '6.063rem']}
          >
            <Typography
              variant="normal"
              fontStyle="normal"
              fontWeight="900"
              lineHeight={['2.743rem', '2.743rem', '4.876rem', '4.876rem']}
              fontSize={['2.25rem', '2.25rem', '4rem', '4rem']}
              as="h2"
            >
              Earn
            </Typography>
            <Typography
              variant="normal"
              fontSize={['1.125rem', '1.125rem', '1.5rem', '1.5rem']}
              as="h3"
              fontWeight="500"
              lineHeight={['1.625rem', '1.625rem', '2.125rem', '2.125rem']}
            >
              Get LP Tokens by providing liquidity to our DEX
            </Typography>
            <Typography
              mt={['0.625rem', '0.625rem', '1rem', '1rem']}
              mb={['1.25rem', '1.25rem', '1.75rem', '1.75rem']}
              fontSize={['0.875rem', '0.875rem', '1rem', '1rem']}
              variant="normal"
            >
              Users pay interest to borrow your coins. All loans are
              overcollateralized to secure your deposits.
            </Typography>
            <Typography variant="normal" fontWeight="700" mb="0.625rem">
              Type of tokens you can use:
            </Typography>
            <Box display="flex" flexWrap="wrap" width={['18rem', '100%']}>
              {LEND_AND_BORROW_TOKENS.map((icons) => (
                <LendAndBorrowTokens icons={icons} key={v4()} />
              ))}
            </Box>
            <Button
              mt={['1.25rem', '1.25rem', '3rem', '3rem']}
              effect="hover"
              variant="primary"
              onClick={() =>
                push(Routes[RoutesEnum.MAILMarket], undefined, {
                  shallow: true,
                })
              }
            >
              Lend
            </Button>
          </Box>
        </AnimationOnScroll>
      </Box>
    </Container>
  );
};

export default MailMarkets;
