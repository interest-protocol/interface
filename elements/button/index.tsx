import styled from '@emotion/styled';
import { forwardRef } from 'react';

import { Theme } from '@/design-system/dapp-theme';
import { renderStyles, renderVariant } from '@/stylin';
import { RenderStylesProps } from '@/stylin/stylin.types';

import { ButtonProps } from './button.types';

const Button = forwardRef(
  ({ hover, active, variant, children, ...props }: ButtonProps, ref) => {
    const ButtonElement = styled.button(
      renderStyles({
        styles: props as RenderStylesProps['styles'],
        pseudo: { ...(hover && { hover }), ...(active && { active }) },
      }),
      ({ theme }) => renderVariant('buttons')(variant, theme as Theme)
    );

    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <ButtonElement {...props} ref={ref}>
        {children}
      </ButtonElement>
    );
  }
);

Button.displayName = 'Button';

export default Button;
