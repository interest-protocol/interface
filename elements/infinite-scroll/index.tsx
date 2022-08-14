import styled from '@emotion/styled';
import InfiniteScroll_, { Props } from 'react-infinite-scroll-component';
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

const InfiniteScroll = styled(InfiniteScroll_)<BoxProps & Props>(
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

export default InfiniteScroll;
