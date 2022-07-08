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
      <Container as="section" py="XXXL" textAlign="center">
        <AnimationOnScroll animateOnce animateIn="animate__flipInX">
          <Typography as="h2" textAlign="center" variant="title1">
            Earn
          </Typography>
        </AnimationOnScroll>
        <AnimationOnScroll animateOnce delay={100} animateIn="animate__flipInX">
          <Typography variant="normal">
            Maximize your profits through automated strategies.
          </Typography>
        </AnimationOnScroll>
        <Box
          mt="XXL"
          display="flex"
          justifyContent="space-around"
          flexDirection={['column', 'row']}
        >
          {EARN_TYPES.map((type, index) => (
            <Box key={v4()} textAlign="center">
              <AnimationOnScroll
                animateOnce
                delay={index * 200 + 300}
                animateIn="animate__zoomInDown"
              >
                <Typography variant="large" as="h3" textTransform="capitalize">
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
