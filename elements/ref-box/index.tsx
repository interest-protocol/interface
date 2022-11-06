import styled from '@emotion/styled';
import { forwardRef } from 'react';

import { Theme } from '@/design-system/landing-page-theme';
import { renderStyles } from '@/stylin';
import { TPseudos, TStyles } from '@/stylin/stylin.types';

import { BoxProps } from '../box/box.types';

const RefBox = forwardRef(({ as, ...props }: BoxProps, ref) => {
  const BoxElement = styled(as || 'div')<BoxProps>(
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
  return <BoxElement {...props} ref={ref} />;
});

RefBox.displayName = 'RefBox';

export default RefBox;
