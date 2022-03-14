import styled from '@emotion/styled';
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

const Input = styled.input(
  compose(
    color,
    space,
    border,
    shadow,
    display,
    layout,
    typography,
    system({
      cursor: {
        property: 'cursor',
      },
    })
  )
);

export default Input;
