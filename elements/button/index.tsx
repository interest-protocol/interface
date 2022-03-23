import styled from '@emotion/styled';
import { css } from '@styled-system/css';
import { FC } from 'react';
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
  const ButtonElement = styled.button(
    css({
      ...(hover && { ':hover': hover }),
      ...(active && { ':active': active }),
    }),
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <ButtonElement {...props} />;
};

export default Button;
