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
  effect?: 'hover';
  as?: keyof JSX.IntrinsicElements;
  rowGap?: MaybeArray<CSSProperties['gap']>;
  cursor?: MaybeArray<CSSProperties['cursor']>;
  filter?: MaybeArray<CSSProperties['filter']>;
  columnGap?: MaybeArray<CSSProperties['gap']>;
  transform?: MaybeArray<CSSProperties['transform']>;
  transition?: MaybeArray<CSSProperties['transition']>;
  backdropFilter?: MaybeArray<CSSProperties['filter']>;
  borderSpacing?: MaybeArray<CSSProperties['borderSpacing']>;
  borderCollapse?: MaybeArray<CSSProperties['borderCollapse']>;
}
