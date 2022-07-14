import { useRouter } from 'next/router';
import { FC } from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { Routes, RoutesEnum } from '@/constants/routes';
import { Box, Button, Typography } from '@/elements';

import { EARN_TYPES } from './earn.data';

const Enjoy: FC = () => {
  const { push } = useRouter();

  return (
    <Box bg="background">
      <Container as="section" pt={['1.875rem', '5.813rem']} textAlign="center">
        <AnimationOnScroll animateOnce animateIn="animate__flipInX">
          <Typography
            as="h2"
            textAlign="center"
            variant="normal"
            fontWeight="900"
            lineHeight="4.876rem"
            mb={['0.875rem', '0.875rem', '0.625rem', '0.625rem']}
            fontSize={['2.75rem', '2.75rem', '4rem', '4rem']}
          >
            Automate
          </Typography>
        </AnimationOnScroll>
        <AnimationOnScroll animateOnce delay={100} animateIn="animate__flipInX">
          <Typography
            variant="normal"
            fontSize={['1rem', '1rem', '1.5rem', '1.5rem']}
            lineHeight={['1.625rem', '1.625rem', '2.125rem', '2.125rem']}
            fontWeight="500"
          >
            Maximize your profits through automated strategies.
          </Typography>
        </AnimationOnScroll>
        <Box
          mt={['1.25rem', '4.313rem']}
          display="flex"
          justifyContent="space-around"
          flexDirection={['column', 'row']}
        >
          {EARN_TYPES.map((type, index) => (
            <Box key={v4()} textAlign="center" mb="L">
              <AnimationOnScroll
                animateOnce
                delay={index * 200 + 300}
                animateIn="animate__zoomInDown"
              >
                <Typography
                  variant="large"
                  as="h3"
                  fontWeight="700"
                  fontSize="2rem"
                  textTransform="capitalize"
                >
                  {type}
                </Typography>
                <Box width="100%" mx="auto">
                  <img width="100%" src={`/${type}.png`} alt={type} />
                </Box>
              </AnimationOnScroll>
            </Box>
          ))}
        </Box>
        <Button
          effect="hover"
          variant="primary"
          onClick={() =>
            push(Routes[RoutesEnum.DApp], undefined, { shallow: true })
          }
        >
          Earn
        </Button>
      </Container>
    </Box>
  );
};

export default Enjoy;
