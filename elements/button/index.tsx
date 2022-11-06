import styled from '@emotion/styled';
import { forwardRef } from 'react';

import { Theme } from '@/design-system/landing-page-theme';
import { renderStyles, renderVariant } from '@/stylin';
import { TPseudos, TStyles } from '@/stylin/stylin.types';

import { ButtonProps } from './button.types';

const Button = forwardRef((props: ButtonProps, ref) => {
  const ButtonElement = styled.button<ButtonProps>(
    ({ theme, variant }) => renderVariant('buttons')(variant, theme as Theme),
    ({ theme, effect }) => renderVariant('effects')(variant, theme as Theme),
    ({ theme, hover, active, ...styles }) =>
      renderStyles(
        {
          styles: styles as TStyles,
          pseudo: {
            ...(hover && { hover }),
            ...(active && { active }),
          } as TPseudos,
        },
        theme as Theme
      )
  );

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ButtonElement {...props} ref={ref} />
  );
});

Button.displayName = 'Button';

export default Button;
