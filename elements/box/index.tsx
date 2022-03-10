import styled from '@emotion/styled';
import React, { FC } from 'react';
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

import { BoxProps } from './box.types';

const Box: FC<BoxProps> = ({ as, ...props }) => {
  const BoxElement = styled(as || 'div')(
    compose(
      position,
      layout,
      space,
      color,
      background,
      flexbox,
      grid,
      typography,
      boxShadow,
      border,
      system({
        cursor: true,
      })
    )
  );

  return <BoxElement {...props} />;
};

export default Box;
