import {
  BorderProps,
  ColorProps,
  DisplayProps,
  LayoutProps,
  ShadowProps,
  SpaceProps,
  TypographyProps,
} from 'styled-system';

export interface InputProps
  extends ColorProps,
    SpaceProps,
    BorderProps,
    DisplayProps,
    LayoutProps,
    ShadowProps,
    TypographyProps {
  cursor?: string;
}
