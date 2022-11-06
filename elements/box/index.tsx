import { FC } from 'react';

import stylin from '@/stylin';

import { BoxProps } from './box.types';

const Box: FC<BoxProps> = ({ as, ...props }: BoxProps) => {
  const StyledBox = stylin<BoxProps>(as || 'div')();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <StyledBox {...props} />;
};

export default Box;
