import styled from '@emotion/styled';
import React, { forwardRef } from 'react';

import { Theme } from '@/design-system/landing-page-theme';
import { renderStyles, renderVariant } from '@/stylin';
import { TPseudos, TStyles } from '@/stylin/stylin.types';

import { TypographyProps } from './typography.types';

const Typography = forwardRef(({ as, ...props }: TypographyProps, ref) => {
  const TypographyElement = styled(as || 'p')<TypographyProps>(
    ({ theme, variant }) =>
      renderVariant('typography')(variant, theme as Theme),
    ({ theme, active, hover, ...rest }) =>
      renderStyles(
        {
          styles: rest as TStyles,
          pseudo: {
            ...(hover && { hover }),
            ...(active && { active }),
          } as TPseudos,
        },
        theme as Theme
      )
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <TypographyElement ref={ref} {...props} />;
});

Typography.displayName = 'Typography';

export default Typography;
