import { FC } from 'react';

import Container from '@/components/container';
import { Box, Button, Typography } from '@/elements';

const Hero: FC = () => (
  <Box
    as="section"
    backgroundImage="linear-gradient(226.51deg, #D5E0FF 34.24%, #D5E0FF 34.24%, #E7EDFF 45.58%, #EBF0FF 76.14%);"
  >
    <Container
      py="XXL"
      height="100%"
      display="flex"
      minHeight="100vh"
      alignItems="center"
      pt={['XXL', 'XXXL']}
    >
      <Box mx="XL">
        <Typography variant="title1" width={['100%', '100%', '37rem']}>
          Money Markets for all <br />
          9000+ tokens on CMC
        </Typography>
        <Typography
          mt="L"
          pb="L"
          mb="XL"
          variant="normal"
          width={['100%', '100%', '22rem']}
          fontSize="L"
          lineHeight="30px"
        >
          Borrow, lend and earn with low systemic risk.
        </Typography>
        <a href="https://docs.interestprotocol.com/" target="__blank">
          <Button type="button" variant="secondary" effect="hover">
            Docs
          </Button>
        </a>
      </Box>
      <Box width="100%" display={['none', 'none', 'block']}>
        <img
          loading="lazy"
          src="/hero-illustration.svg"
          alt="Interest Protocol Illustration"
        />
      </Box>
    </Container>
  </Box>
);

export default Hero;
