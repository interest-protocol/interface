import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { FC } from 'react';

import Box from '@/elements/box';
import { BoxProps } from '@/elements/box/box.types';

const FloatingCoinsAnimation = keyframes`
  0% {
    transform: translateY(0%);
  }
  40% {
    transform: translateY(5%);
  }
  100% {
    transform: translateY(0%);
  }
`;

export const FloatingCoins = styled(Box)<BoxProps & { delay: number }>`
  animation: ${FloatingCoinsAnimation} ${({ delay }) => 3000 + delay}ms infinite
    ease-in-out;
`;

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
  transform: scaleY(0.6) rotate(0deg) translateX(${x}) translateY(${y})
    rotate(0deg);
  img {
    transform: scaleY(1.8);
  }
`;

export const BTCOrbit = Orbit(OrbitAnimation, '20%', '-130%');
export const VUSDCOrbit = Orbit(OrbitAnimation, '-40%', '130%');
export const DAIxUSDCOrbit = Orbit(OrbitAnimation, '60%', '30%');
export const SUSHIxCAKEOrbit = Orbit(OrbitAnimation, '-80%', '-30%');
