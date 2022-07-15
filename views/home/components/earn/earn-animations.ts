import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { FC } from 'react';

import { Box } from '@/elements';
import { BoxProps } from '@/elements/box/box.types';

const USDCxETHOrbitAnimation = keyframes`
  0% {
    transform: scaleY(0.6) rotate(0deg) translateX(50%) translateY(40%) rotate(0deg);
  }
  100% {
    transform: scaleY(0.6) rotate(-360deg) translateX(50%) translateY(40%) rotate(360deg);
  }
`;

const TetherAnimation = keyframes`
    0% {
      transform: scaleY(0.6) rotate(0deg) translateX(-160%) translateY(-160%) rotate(0deg);
    }
    100% {
      transform: scaleY(0.6) rotate(-360deg) translateX(-160%) translateY(-160%) rotate(360deg);
    }
`;

const BitcoinAnimation = keyframes`
    0% {
      transform: scaleY(0.6) rotate(0deg) translateX(10%) translateY(-220%) rotate(0deg);
    }
    100% {
      transform: scaleY(0.6) rotate(-360deg) translateX(10%) translateY(-220%) rotate(360deg);
    }
`;

const EtherAnimation = keyframes`
    0% {
      transform: scaleY(0.6) rotate(0deg) translateX(-160%) translateY(20%) rotate(0deg);
    }
    100% {
      transform: scaleY(0.6) rotate(-360deg) translateX(-160%) translateY(20%) rotate(360deg);
    }
`;

const BinanceAnimation = keyframes`
    0% {
      transform: scaleY(0.6) rotate(0deg) translateX(-50%) translateY(110%) rotate(0deg);
    }
    100% {
      transform: scaleY(0.6) rotate(-360deg) translateX(-50%) translateY(110%) rotate(360deg);
    }
`;

const Orbit = (animation: typeof TetherAnimation): FC<BoxProps> => styled(Box)`
  animation: ${animation} 60s infinite 1s linear;
  img {
    transform: scaleY(1.6);
  }
`;

export const USDCxETHOrbit = Orbit(USDCxETHOrbitAnimation);
export const TetherOrbit = Orbit(TetherAnimation);
export const BitcoinOrbit = Orbit(BitcoinAnimation);
export const EtherOrbit = Orbit(EtherAnimation);
export const BinanceOrbit = Orbit(BinanceAnimation);
