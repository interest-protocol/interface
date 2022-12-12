import { keyframes } from '@emotion/react';
import { forwardRef } from 'react';

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

interface FloatingProps extends BoxProps {
  delay: number;
}

/*export const FloatingCoins =forwardRef(
  (
    {
      delay    }:FloatingProps
  ) => {
    const Float=stylin<BoxProps & { delay: number }>('div')({name.})


  }
)
  stylin<BoxProps & { delay: number }>('div')({name.})`
  animation: ${FloatingCoinsAnimation} ${3000 + delay}ms infinite
    ease-in-out;
`;
*/
