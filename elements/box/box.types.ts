import { SystemStyleObject } from '@styled-system/css';
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
  ResponsiveValue,
  SpaceProps,
  TypographyProps,
} from 'styled-system';

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
    Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'height'> {
  effect?: 'hover';
  hover?: SystemStyleObject;
  active?: SystemStyleObject;
  as?: keyof JSX.IntrinsicElements;
  rowGap?: ResponsiveValue<CSSProperties['gap']>;
  cursor?: ResponsiveValue<CSSProperties['cursor']>;
  filter?: ResponsiveValue<CSSProperties['filter']>;
  columnGap?: ResponsiveValue<CSSProperties['gap']>;
  clipPath?: ResponsiveValue<CSSProperties['clipPath']>;
  objectFit?: ResponsiveValue<CSSProperties['objectFit']>;
  transform?: ResponsiveValue<CSSProperties['transform']>;
  whiteSpace?: ResponsiveValue<CSSProperties['whiteSpace']>;
  transition?: ResponsiveValue<CSSProperties['transition']>;
  backdropFilter?: ResponsiveValue<CSSProperties['filter']>;
  borderSpacing?: ResponsiveValue<CSSProperties['borderSpacing']>;
  pointerEvents?: ResponsiveValue<CSSProperties['pointerEvents']>;
  borderCollapse?: ResponsiveValue<CSSProperties['borderCollapse']>;
}
