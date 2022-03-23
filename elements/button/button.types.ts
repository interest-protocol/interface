import { SystemStyleObject } from '@styled-system/css';
import { ButtonHTMLAttributes } from 'react';
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
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  hover?: SystemStyleObject;
  active?: SystemStyleObject;
  effects?: 'hover';
  variant: 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'special';
}
