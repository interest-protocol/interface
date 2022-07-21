import { BoxProps } from '@/elements/box/box.types';

export interface ContainerProps
  extends Omit<
    Omit<
      Omit<Omit<Omit<Omit<BoxProps, 'maxWidth'>, 'ml'>, 'mr'>, 'marginLeft'>,
      'marginRight'
    >,
    'mx'
  > {
  dapp?: boolean;
  large?: boolean;
  dividedBy?: number;
  side?: 'left' | 'right';
}
