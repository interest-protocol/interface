import styled from '@emotion/styled';

import { Box } from '@/elements';
import { BoxProps } from '@/elements/box/box.types';

const FlipMemberCard = styled(Box)<BoxProps>`
  width: 100%;
  perspective: 3000px;
  & .flip {
    &Wrapper {
      width: 100%;
      transform-style: preserve-3d;
      transition: transform 300ms ease-in-out;
      transform: rotateY(0deg);
    }
    &Image,
    &Bio {
      width: 100%;
      height: 100%;
      position: absolute;
      backface-visibility: hidden;
    }
    &Bio {
      transform: rotateY(180deg);
    }
  }
  &:hover {
    & .flip {
      &Wrapper {
        transform: rotateY(180deg);
      }
    }
  }
`;

export default FlipMemberCard;
