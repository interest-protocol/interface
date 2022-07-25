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

const FloatingAnimation = keyframes`
  0% {
    transform: translateY(0%);
  }
  40% {
    transform: translateY(-1%);
  }
  100% {
    transform: translateY(0%);
  }
`;

export const OrbitCoin: FC<BoxProps & { x: string; y: string }> = styled(Box)<
  BoxProps & { x: string; y: string }
>`
  transform-origin: center center;
  transform: scaleY(0.6) rotate(0deg)
    ${({ x, y }) => `translateX(${x}) translateY(${y})`} rotate(0deg);
  animation: ${({ x, y }) => OrbitAnimation(x, y)} 60s infinite 1s linear;

  img {
    transform: scaleY(1.6);
  }
`;

export const FloatingDisk = styled(Box)<BoxProps & { delay: number }>`
  animation: ${FloatingAnimation} ${({ delay }) => 3000 + delay}ms infinite
    ease-in-out;
`;
