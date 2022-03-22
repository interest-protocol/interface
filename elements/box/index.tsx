import styled from '@emotion/styled';
import React, { forwardRef, useState } from 'react';
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

const Box = forwardRef(({ as, hover, active, ...props }: BoxProps, ref) => {
  const [isHover, setIsHover] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const touchEnd = () => setIsActive(false);
  const touchStart = () => setIsActive(true);
  const mouseEnter = () => setIsHover(true);
  const mouseLeave = () => setIsHover(false);

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
        borderCollapse: true,
      })
    )
  );

  return (
    <BoxElement
      {...props}
      ref={ref}
      {...(isHover && hover)}
      {...(isActive && active)}
      onTouchEnd={touchEnd}
      onTouchStart={touchStart}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    />
  );
});

Box.displayName = 'Box';

export default Box;
