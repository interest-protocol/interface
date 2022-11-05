import { SystemStyleObject } from '@styled-system/css';
import { CSSProperties, HTMLAttributes } from 'react';
import {
  BorderProps,
  BoxShadowProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  ResponsiveValue,
  SpaceProps,
  TextShadowProps,
  TypographyProps as TypoProps,
} from 'styled-system';

export interface TypographyProps
  extends LayoutProps,
    TypoProps,
    ColorProps,
    SpaceProps,
    BorderProps,
    FlexboxProps,
    PositionProps,
    BoxShadowProps,
    TextShadowProps,
    Omit<HTMLAttributes<HTMLElement>, 'color'> {
  hover?: SystemStyleObject;
  active?: SystemStyleObject;
  as?: keyof JSX.IntrinsicElements;
  cursor?: ResponsiveValue<CSSProperties['cursor']>;
  whiteSpace?: ResponsiveValue<CSSProperties['whiteSpace']>;
  textTransform?: ResponsiveValue<CSSProperties['textTransform']>;
  textDecoration?: ResponsiveValue<CSSProperties['textDecoration']>;
  variant:
    | 'title1'
    | 'title2'
    | 'title3'
    | 'title4'
    | 'normal'
    | 'large'
    | 'button';
}
