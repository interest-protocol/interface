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
} from 'styled-system';

import { BoxProps } from './box.types';

const Box = forwardRef(({ as, ...props }: BoxProps, ref) => {
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
        filter: true,
        rowGap: true,
        columnGap: true,
        backdropFilter: true,
      })
    )
  );

  return <BoxElement {...props} ref={ref} />;
});

Box.displayName = 'Box';

export default Box;
