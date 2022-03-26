import styled from '@emotion/styled';
import css from '@styled-system/css';
import {
  border,
  color,
  compose,
  display,
  layout,
  shadow,
  space,
  system,
  typography,
} from 'styled-system';

import { InputFieldProps } from './input.types';

const InputField = styled.input<InputFieldProps>(
  css({
    width: '100%',
    height: '100%',
    border: 'none',
    outline: 'none',
    bg: 'transparent',
    overflow: 'hidden',
    '&:-internal-autofill-selected': {
      bg: 'transparent',
    },
    '&:focus-visible': {
      outline: 'none',
    },
  }),
  compose(
    color,
    space,
    border,
    shadow,
    display,
    layout,
    typography,
    system({
      cursor: true,
      outline: true,
    })
  )
);

export default InputField;
