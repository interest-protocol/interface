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
