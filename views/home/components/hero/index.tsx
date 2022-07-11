import { FC } from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';

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
    <AnimationOnScroll duration={3} animateIn="animate__fadeIn">
      <Container
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
        <Box width={['100%', '100%', '41.239rem', '41.239rem']}>
          <Typography
            fontSize={['2.75rem', '2.75rem', '4rem', '4rem']}
            fontStyle="normal"
            fontWeight="900"
            lineHeight={['3.353rem', '3.353rem', '4.876rem', '4.876rem']}
            variant="normal"
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
    </AnimationOnScroll>
  </Box>
);

export default Hero;
