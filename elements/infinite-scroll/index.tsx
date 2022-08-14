import styled from '@emotion/styled';
import InfiniteScroll, { Props } from 'react-infinite-scroll-component';
import {
  background,
  border,
  boxShadow,
  color,
  compose,
  flexbox,
  grid,
  layout,
  position,
  space,
  system,
  typography,
} from 'styled-system';

import { BoxProps } from '../box/box.types';

const Button = styled(InfiniteScroll)<BoxProps & Props>(
  compose(
    grid,
    space,
    color,
    border,
    layout,
    flexbox,
    position,
    boxShadow,
    typography,
    background,
    system({
      cursor: true,
      filter: true,
      rowGap: true,
      clipPath: true,
      columnGap: true,
      transform: true,
      transition: true,
      whiteSpace: true,
      backdropFilter: true,
      borderCollapse: true,
    })
  )
);

export default Button;
