import styled from '@emotion/styled';
import React, { FC, useState } from 'react';
import {
  border,
  boxShadow,
  color,
  compose,
  layout,
  position,
  space,
  system,
  textShadow,
  typography,
  variant,
} from 'styled-system';

import { TypographyProps } from './typography.types';

const Typography: FC<TypographyProps> = ({ as, hover, active, ...props }) => {
  const [isHover, setIsHover] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const touchEnd = () => setIsActive(false);
  const touchStart = () => setIsActive(true);
  const mouseEnter = () => setIsHover(true);
  const mouseLeave = () => setIsHover(false);

  const TypographyElement = styled(as || 'p')(
    variant({
      scale: 'typography',
    }),
    compose(
      space,
      color,
      layout,
      border,
      position,
      boxShadow,
      typography,
      textShadow,
      system({
        cursor: true,
        textTransform: true,
        whiteSpace: true,
      })
    )
  );

  return (
    <TypographyElement
      {...props}
      {...(isHover && hover)}
      {...(isActive && active)}
      onTouchEnd={touchEnd}
      onTouchStart={touchStart}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    />
  );
};

export default Typography;
