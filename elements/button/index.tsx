import styled from '@emotion/styled';
import { css } from '@styled-system/css';
import { forwardRef } from 'react';
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
  system,
  typography,
  variant,
} from 'styled-system';

import { ButtonProps } from './button.types';

const Button = forwardRef(({ hover, active, ...props }: ButtonProps, ref) => {
  const ButtonElement = styled.button(
    css({
      ...(hover && { transition: 'all 250ms ease-in-out', ':hover': hover }),
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
      typography,
      system({
        cursor: true,
      })
    )
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <ButtonElement {...props} ref={ref} />;
});

Button.displayName = 'Button';

export default Button;
