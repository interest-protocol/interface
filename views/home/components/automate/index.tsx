import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { Routes, RoutesEnum } from '@/constants/routes';
import { Box, Button, ResponsiveImage, Typography } from '@/elements';

import { FloatingDisk, OrbitCoin } from './automate.animation';
import { EARN_TYPES } from './automate.data';

const Automate: FC = () => {
  const { push } = useRouter();

  return (
    <Box bg="background" pb="XXL" as="section">
      <Container as="section" pt={['1.875rem', '5.813rem']} textAlign="center">
        <Typography
          as="h2"
          variant="normal"
          fontWeight="900"
          textAlign="center"
          lineHeight="4.876rem"
          mb={['0.875rem', '0.875rem', '0.625rem', '0.625rem']}
          fontSize={['2.75rem', '2.75rem', '4rem', '4rem']}
        >
          Automate
        </Typography>
        <Typography
          variant="normal"
          fontWeight="500"
          fontSize={['1rem', '1rem', '1.5rem', '1.5rem']}
          lineHeight={['1.625rem', '1.625rem', '2.125rem', '2.125rem']}
        >
          Maximize your profits through automated strategies.
        </Typography>
        <Box
          mt={['1.25rem', '4.313rem']}
          display="flex"
          justifyContent="space-around"
          flexDirection={['column', 'row']}
        >
          {EARN_TYPES.map(({ type, coins }) => (
            <Box key={v4()} textAlign="center" mb="L" mx="L">
              <Typography
                variant="large"
                as="h3"
                fontWeight="700"
                fontSize="2rem"
                textTransform="capitalize"
              >
                {type}
              </Typography>
              <Box width="100%" mx="auto" my="XXL" position="relative">
                <FloatingDisk
                  delay={~~(Math.random() * 1500)}
                  filter="drop-shadow(-2px 20px 10px #0002)"
                >
                  <ResponsiveImage
                    width="100%"
                    alt={`Automate - ${type}`}
                    path={`home/automate-${type}-disk`}
                  />
                </FloatingDisk>
                {coins?.map(({ name, x, y, top, left, width }) => (
                  <OrbitCoin
                    x={x}
                    y={y}
                    top={top}
                    left={left}
                    key={v4()}
                    width={width}
                    position="absolute"
                    filter="drop-shadow(10px 30px 2px #0004)"
                  >
                    <ResponsiveImage
                      alt={`Automate - ${name} Token ${type}`}
                      width="100%"
                      path={`home/automate-${type}-${name}`}
                    />
                  </OrbitCoin>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
        <Button
          effect="hover"
          variant="primary"
          onClick={() =>
            push(Routes[RoutesEnum.Earn], undefined, { shallow: true })
          }
        >
          Earn
        </Button>
      </Container>
    </Box>
  );
};

export default Automate;
