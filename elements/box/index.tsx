import styled from '@emotion/styled';
import { FC } from 'react';

import { renderStyles } from '@/stylin';
import { RenderStylesProps } from '@/stylin/stylin.types';

import { BoxProps } from './box.types';

const Box: FC<BoxProps> = ({
  as,
  hover,
  active,
  children,
  ...props
}: BoxProps) => {
  const StyledBox = styled(as || 'div')(
    renderStyles({
      styles: props as RenderStylesProps['styles'],
      pseudo: { ...(hover && { hover }), ...(active && { active }) },
    })
  );

  return <StyledBox>{children}</StyledBox>;
};

export default Box;
