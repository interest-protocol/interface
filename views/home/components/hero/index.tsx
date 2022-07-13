import { FC } from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';

import { Container } from '@/components';
import { Box, Button, Typography } from '@/elements';

const Hero: FC = () => (
  <Box
    as="section"
    backgroundImage={[
      'linear-gradient(105.71deg, #EEEEEE -1.51%, #E8E8E8 20.1%, #DBDBDA 72.59%);',
      'none',
    ]}
    minHeight="100vh"
  >
    <AnimationOnScroll animateOnce duration={3} animateIn="animate__fadeIn">
      <Container position="relative" minHeight="100vh" pb="XXXL">
        <Box
          zIndex={2}
          position="relative"
          ml={['none', 'none', '8.438rem', '8.438rem']}
          width={['100%', '100%', '41.239rem', '45.938rem']}
          pt={['7rem', '7rem', '12rem', '12rem']}
          pb={['unset', '17.438rem']}
          display="flex"
          flexDirection="column"
          alignItems={['center', 'unset']}
        >
          <Typography
            fontSize={['2.75rem', '2.75rem', '4rem', '4rem']}
            fontStyle="normal"
            fontWeight="900"
            lineHeight={['3.353rem', '3.353rem', '4.876rem', '4.876rem']}
            variant="normal"
            textTransform="capitalize"
            textAlign={['center', 'unset']}
          >
            borrow Dinero for free
          </Typography>
          <Typography
            mt="0.625rem"
            mb="1.875rem"
            fontSize={['1rem', '1rem', '1.5rem', '1.5rem']}
            variant="normal"
            lineHeight="30px"
          >
            Dinero is an overcollateralized stablecoin
          </Typography>
          <a href="https://docs.interestprotocol.com/" target="__blank">
            <Button type="button" variant="primary" effect="hover">
              Learn More
            </Button>
          </a>
        </Box>
        <Box
          width={['100%', '45%']}
          height={['20rem', 'unset']}
          top={['none', '12rem']}
          position={['relative', 'absolute']}
          right="0"
          mt={['3rem', 'unset']}
        >
          <img
            loading="lazy"
            width="100%"
            height="100%"
            src="/hero-illustration.png"
            alt="Interest Protocol Illustration"
          />
        </Box>
      </Container>
    </AnimationOnScroll>
  </Box>
);

export default Hero;
