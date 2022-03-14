import { CSSProperties, HTMLAttributes } from 'react';
import {
  BackgroundProps,
  BorderProps,
  ColorProps,
  DisplayProps,
  FlexProps,
  LayoutProps,
  PositionProps,
  ShadowProps,
  SpaceProps,
  TypographyProps,
} from 'styled-system';

export interface ModalProps
  extends ColorProps,
    SpaceProps,
    BorderProps,
    LayoutProps,
    FlexProps,
    PositionProps,
    DisplayProps,
    ShadowProps,
    BackgroundProps,
    TypographyProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  cursor?: CSSProperties['cursor'];
}
