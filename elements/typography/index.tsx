import { forwardRef, RefAttributes } from 'react';

import stylin, { variant } from '@/stylin';

import { TypographyProps } from './typography.types';

const Typography = forwardRef(({ as, ...props }: TypographyProps, ref) => {
  const TypographyElement = stylin<TypographyProps & RefAttributes<unknown>>(
    as || 'p'
  )(variant({ scale: 'typography', property: 'variant' }));

  return <TypographyElement ref={ref} {...props} />;
});

Typography.displayName = 'Typography';

export default Typography;
