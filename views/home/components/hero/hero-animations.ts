import { css, keyframes } from '@emotion/react';

import { BoxProps } from '@/elements/box/box.types';
import stylin from '@/stylin';

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

export const FloatingCoins = stylin<BoxProps & { delay: number }>('div')(
  ({ delay }) => css`
    animation: ${FloatingCoinsAnimation} ${3000 + delay}ms infinite ease-in-out;
  `
);
