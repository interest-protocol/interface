import { FC } from 'react';

import stylin from '@/stylin';

import { BoxProps } from './box.types';

const Box: FC<BoxProps> = ({ as, ...props }: BoxProps) => {
  const StyledBox = stylin<BoxProps>(as || 'div')();

  return <StyledBox {...props} />;
};

export default Box;
