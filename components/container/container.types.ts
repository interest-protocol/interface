import { BoxProps } from '../../elements/box/box.types';

export type ContainerProps = Omit<
  Omit<
    Omit<Omit<Omit<Omit<BoxProps, 'maxWidth'>, 'ml'>, 'mr'>, 'marginLeft'>,
    'marginRight'
  >,
  'mx'
>;
