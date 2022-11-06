import { forwardRef } from 'react';

import stylin, { variant } from '@/stylin';

import { ButtonProps } from './button.types';

const Button = forwardRef((props: ButtonProps, ref) => {
  const ButtonElement = stylin<ButtonProps>('button')(
    variant({ scale: 'buttons', property: 'variant' }),
    variant({ scale: 'effects', property: 'effect' })
  );

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ButtonElement {...props} ref={ref} />
  );
});

Button.displayName = 'Button';

export default Button;
