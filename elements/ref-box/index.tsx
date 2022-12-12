import { forwardRef, RefAttributes } from 'react';

import stylin from '@/stylin';

import { BoxProps } from '../box/box.types';

const RefBox = forwardRef(({ as, ...props }: BoxProps, ref) => {
  const BoxElement = stylin<BoxProps & RefAttributes<unknown>>(as || 'div')();

  return <BoxElement {...props} ref={ref} />;
});

RefBox.displayName = 'RefBox';

export default RefBox;
