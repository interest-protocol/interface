import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

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
