import { HTMLAttributes } from 'react';
import {
  BackgroundProps,
  BorderProps,
  ColorProps,
  DisplayProps,
  LayoutProps,
  SpaceProps,
  TypographyProps,
} from 'styled-system';

export interface ViewProps
  extends ColorProps,
    SpaceProps,
    BorderProps,
    LayoutProps,
    DisplayProps,
    BackgroundProps,
    TypographyProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'color'> {}
