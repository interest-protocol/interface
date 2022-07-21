import { SystemStyleObject } from '@styled-system/css';
import { CSSProperties, HTMLAttributes } from 'react';
import {
  BorderProps,
  BoxShadowProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  TextShadowProps,
  TypographyProps as TypoProps,
} from 'styled-system';

import { MaybeArray } from '@/interface';

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
  cursor?: MaybeArray<CSSProperties['cursor']>;
  whiteSpace?: MaybeArray<CSSProperties['whiteSpace']>;
  textTransform?: MaybeArray<CSSProperties['textTransform']>;
  variant: MaybeArray<
    'title1' | 'title2' | 'title3' | 'title4' | 'normal' | 'large' | 'button'
  >;
}
