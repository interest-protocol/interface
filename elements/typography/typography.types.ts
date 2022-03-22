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
  whiteSpace?: CSSProperties['whiteSpace'];
  textTransform?: CSSProperties['textTransform'];
  hover?: Omit<Omit<TypographyProps, 'as'>, 'variant'>;
  active?: Omit<Omit<TypographyProps, 'as'>, 'variant'>;
  variant: 'title1' | 'title2' | 'title3' | 'title4' | 'normal';
}
