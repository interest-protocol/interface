import React, { forwardRef } from 'react';

import stylin, { variant } from '@/stylin';

import { TypographyProps } from './typography.types';

const Typography = forwardRef(({ as, ...props }: TypographyProps, ref) => {
  const TypographyElement = stylin<TypographyProps>(as || 'p')(
    variant({ scale: 'typography', property: 'variant' })
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <TypographyElement ref={ref} {...props} />;
});

Typography.displayName = 'Typography';

export default Typography;
