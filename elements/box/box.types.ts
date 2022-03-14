import { CSSProperties, HTMLAttributes } from 'react';
import {
  BackgroundProps,
  BorderProps,
  BoxShadowProps,
  ColorProps,
  FlexboxProps,
  GridProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  TypographyProps,
} from 'styled-system';

import { MaybeArray } from '../../interface';

export interface BoxProps
  extends FlexboxProps,
    GridProps,
    LayoutProps,
    PositionProps,
    TypographyProps,
    ColorProps,
    BackgroundProps,
    BoxShadowProps,
    BorderProps,
    SpaceProps,
    Omit<HTMLAttributes<HTMLElement>, 'color'> {
  as?: keyof JSX.IntrinsicElements;
  cursor?: MaybeArray<CSSProperties['cursor']>;
  filter?: MaybeArray<CSSProperties['filter']>;
  rowGap?: MaybeArray<CSSProperties['gap']>;
  columnGap?: MaybeArray<CSSProperties['gap']>;
  backdropFilter?: MaybeArray<CSSProperties['filter']>;
}
