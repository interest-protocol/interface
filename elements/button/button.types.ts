import { HTMLAttributes } from 'react';
import {
  BackgroundProps,
  BorderProps,
  ColorProps,
  DisplayProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  ShadowProps,
  SpaceProps,
  TypographyProps,
} from 'styled-system';

export interface ButtonProps
  extends ColorProps,
    SpaceProps,
    PositionProps,
    BorderProps,
    LayoutProps,
    FlexboxProps,
    DisplayProps,
    ShadowProps,
    BackgroundProps,
    TypographyProps,
    Omit<HTMLAttributes<HTMLButtonElement>, 'color'> {
  variant: 'primary';
}
