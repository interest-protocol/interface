import { forwardRef } from 'react';

import stylin from '@/stylin';

import { BoxProps } from '../box/box.types';

const RefBox = forwardRef(({ as, ...props }: BoxProps, ref) => {
  const BoxElement = stylin<BoxProps>(as || 'div')();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <BoxElement {...props} ref={ref} />;
});

RefBox.displayName = 'RefBox';

export default RefBox;
