import { FC } from 'react';
import { v4 } from 'uuid';

import Container from '@/components/container';
import { Box, Button, Typography } from '@/elements';

import { LEND_AND_BORROW_TOKENS } from './mail-markets.data';
import LendAndBorrowTokens from './mail-markets-tokens';

const MailMarkets: FC = () => (
  <Container as="section" bg={['#EEE  ', 'transparent']}>
    <Box
      mt="-20rem"
      display="flex"
      alignItems="center"
      py={['XXL', 'XXXL']}
      justifyContent="space-around"
      flexDirection={['column-reverse', 'row']}
    >
      <Box width={['100%', '50%']}>
        <img src="/token-disk.png" width="100%" alt="Tokens Ecosystem" />
      </Box>
      <Box
        bg="foreground"
        borderRadius="M"
        px={['L', 'XXL']}
        py={['XL', 'XXL']}
      >
        <Typography variant="title1" as="h2" display={['none', 'block']}>
          Lend & Borrow
        </Typography>
        <Typography variant="title1" as="h2" display={['block', 'none']}>
          Mail Markets
        </Typography>
        <Typography variant="large" as="h3" fontWeight="400">
          Deposit your coins to earn and borrow
        </Typography>
        <Typography
          my="L"
          variant="normal"
          width={['100%', '450px']}
          fontSize={['button', 'none']}
        >
          Users pay interest to borrow your coins. All loans are
          overcollateralized to secure your deposits.
        </Typography>
        <Typography variant="normal" fontWeight="700" mt="XL">
          Type of tokens you can use:
        </Typography>
        <Box my="L" display="flex" flexWrap="wrap" width={['18rem', '100%']}>
          {LEND_AND_BORROW_TOKENS.map((icons) => (
            <LendAndBorrowTokens icons={icons} key={v4()} />
          ))}
        </Box>
        <Button variant="primary" my="XL">
          Lend
        </Button>
      </Box>
    </Box>
  </Container>
);

export default MailMarkets;
