import styled from '@emotion/styled';
import React, { forwardRef } from 'react';
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
  variant,
} from 'styled-system';

import { BoxProps } from './box.types';

const Box = forwardRef(({ as, ...props }: BoxProps, ref) => {
  const BoxElement = styled(as || 'div')(
    variant({
      prop: 'effect',
      scale: 'effects',
    }),
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
        columnGap: true,
        transform: true,
        transition: true,
        backdropFilter: true,
      })
    )
  );

  return <BoxElement {...props} ref={ref} />;
});

Box.displayName = 'Box';

export default Box;
