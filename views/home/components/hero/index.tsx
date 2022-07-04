import { FC } from 'react';

import Container from '@/components/container';
import { Box, Button, Typography } from '@/elements';

const Hero: FC = () => (
  <Box
    as="section"
    backgroundImage={[
      'linear-gradient(105.71deg, #EEEEEE -1.51%, #E8E8E8 20.1%, #DBDBDA 72.59%);',
      'none',
    ]}
  >
    <Container
      px="S"
      py="XXL"
      pt="XXXL"
      pb="20rem"
      height="100%"
      display="flex"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection={['column', 'row']}
    >
      <Box mx="XL">
        <Typography variant="title1" as="h2">
          <Typography
            as="span"
            display="block"
            variant="title1"
            whiteSpace="nowrap"
          >
            Lend, Borrow,
          </Typography>
          <Typography
            as="span"
            variant="title1"
            display={['block', 'inline-block']}
          >
            Swap And
          </Typography>{' '}
          <Typography
            as="span"
            variant="title1"
            whiteSpace={['normal', 'nowrap']}
            display={['block', 'inline-block']}
          >
            Earn
          </Typography>
        </Typography>
        <Typography
          mt="L"
          pb="L"
          mb="XL"
          fontSize="L"
          variant="normal"
          lineHeight="30px"
        >
          Permissionless lending and trading protocol
        </Typography>
        <a href="https://docs.interestprotocol.com/" target="__blank">
          <Button type="button" variant="primary" effect="hover">
            Learn More
          </Button>
        </a>
      </Box>
      <Box width={['100%', '50%']}>
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
