import { CSSProperties, HTMLAttributes } from 'react';
import {
  BorderProps,
  ColorProps,
  LayoutProps,
  PositionProps,
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
    PositionProps,
    TextShadowProps,
    Omit<HTMLAttributes<HTMLElement>, 'color'> {
  as?: keyof JSX.IntrinsicElements;
  cursor?: CSSProperties['cursor'];
  variant: 'title1' | 'title2' | 'title3' | 'title4' | 'normal';
  textTransform?: CSSProperties['textTransform'];
  whiteSpace?: CSSProperties['whiteSpace'];
}
