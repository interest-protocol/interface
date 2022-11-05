import styled from '@emotion/styled';
import { FC } from 'react';

import { Theme } from '@/design-system/landing-page-theme';
import { renderStyles } from '@/stylin';
import { TPseudos, TStyles } from '@/stylin/stylin.types';

import { BoxProps } from './box.types';

const Box: FC<BoxProps> = ({ as, ...props }: BoxProps) => {
  const StyledBox = styled(as || 'div')<BoxProps>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ children, theme, active, hover, ...styles }) =>
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <StyledBox {...props} />;
};

export default Box;
