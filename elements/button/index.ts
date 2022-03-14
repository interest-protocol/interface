import styled from '@emotion/styled';
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

const Button = styled.button<ButtonProps>(
  variant({ scale: 'buttons' }),
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

export default Button;
