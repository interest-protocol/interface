import styled from '@emotion/styled';
import { FC, useState } from 'react';
import {
  border,
  color,
  compose,
  display,
  flexbox,
  layout,
  position,
  shadow,
  space,
  typography,
  variant,
} from 'styled-system';

import { ButtonProps } from './button.types';

const Button: FC<ButtonProps> = ({ hover, active, ...props }) => {
  const [isHover, setIsHover] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const touchEnd = () => setIsActive(false);
  const touchStart = () => setIsActive(true);
  const mouseEnter = () => setIsHover(true);
  const mouseLeave = () => setIsHover(false);

  const StyledButton = styled.button(
    variant({ scale: 'buttons' }),
    variant({ prop: 'effect', scale: 'effects' }),
    compose(
      color,
      space,
      border,
      shadow,
      display,
      position,
      layout,
      flexbox,
      typography
    )
  );
  return (
    <StyledButton
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
export default Button;
