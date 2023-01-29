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

export const TSLAOrbit = Orbit(OrbitAnimation, '180%', '-10%');
export const EUROrbit = Orbit(OrbitAnimation, '-170%', '0%');
export const BAYCOrbit = Orbit(OrbitAnimation, '-80%', '-220%');
export const BRLOrbit = Orbit(OrbitAnimation, '90%', '250%');
export const OILOrbit = Orbit(OrbitAnimation, '-80%', '220%');
export const XAUOrbit = Orbit(OrbitAnimation, '90%', '-200%');
