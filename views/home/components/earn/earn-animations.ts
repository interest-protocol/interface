import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { FC } from 'react';

import { Box } from '@/elements';
import { BoxProps } from '@/elements/box/box.types';

const OrbitAnimation = (x: string, y: string) => keyframes`
  0% {
    transform: scaleY(0.6) rotate(0deg) translateX(${x}) translateY(${y}) rotate(0deg);
  }
  100% {
    transform: scaleY(0.6) rotate(-360deg) translateX(${x}) translateY(${y}) rotate(360deg);
  }
`;

const Orbit = (
  animation: typeof OrbitAnimation,
  x: string,
  y: string
): FC<BoxProps> => styled(Box)`
  animation: ${animation(x, y)} 60s infinite 1s linear;
  transform-origin: center center;
  transform: scaleY(0.6) rotate(0deg) translateX(${x}) translateY(${y})
    rotate(0deg);
  img {
    transform: scaleY(1.6);
  }
`;

export const USDCxETHOrbit = Orbit(OrbitAnimation, '50%', '40%');
export const TetherOrbit = Orbit(OrbitAnimation, '-160%', '-160%');
export const BitcoinOrbit = Orbit(OrbitAnimation, '10%', '-220%');
export const EtherOrbit = Orbit(OrbitAnimation, '-160%', '20%');
export const BinanceOrbit = Orbit(OrbitAnimation, '-50%', '110%');
