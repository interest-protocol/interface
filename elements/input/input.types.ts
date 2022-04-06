import { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';
import {
  BorderProps,
  ColorProps,
  DisplayProps,
  LayoutProps,
  ShadowProps,
  SpaceProps,
  TypographyProps,
} from 'styled-system';

import { BoxProps } from '../box/box.types';

export type InputFieldProps = ColorProps &
  SpaceProps &
  BorderProps &
  DisplayProps &
  LayoutProps &
  ShadowProps &
  TypographyProps &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'color' | 'width' | 'height' | 'size'
  >;

export interface InputProps extends InputFieldProps {
  Prefix?: ReactNode;
  Suffix?: ReactNode;
  shieldProps?: BoxProps;
  onClickPrefix?: () => void;
  onClickSuffix?: () => void;
  outline?: CSSProperties['outline'];
}
