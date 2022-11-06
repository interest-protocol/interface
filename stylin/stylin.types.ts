import { SerializedStyles } from '@emotion/react';
import { CSSInterpolation } from '@emotion/serialize';
import { CSSProperties } from 'react';
import { ResponsiveValue } from 'styled-system';

import { Theme } from '@/design-system/landing-page-theme';

type TStyleEffect = 'hover' | 'active';

export type TStyleValue = ResponsiveValue<string | number>;

export enum StylinCustomProperties {
  bg = 'bg',
  m = 'm',
  mx = 'mx',
  my = 'my',
  mt = 'mt',
  mr = 'mr',
  mb = 'mb',
  ml = 'ml',
  p = 'p',
  px = 'px',
  py = 'py',
  pt = 'pt',
  pr = 'pr',
  pb = 'pb',
  pl = 'pl',
}

export type TStyleKeys = keyof CSSProperties & StylinCustomProperties;

export type TStyles = Record<TStyleKeys, TStyleValue>;
export type TPseudos = Record<TStyleEffect, TStyleValue>;

export interface RenderStylesProps {
  styles: TStyles;
  pseudo: TPseudos;
}

export type TRenderStyles = (
  { styles, pseudo }: RenderStylesProps,
  theme: Theme
) => SerializedStyles;

export type TRenderResponsiveStyles = (
  theme: Theme,
  prop: TStyleKeys,
  value: TStyleValue
) => Array<CSSInterpolation>;

export type TRenderPseudoSelector = (
  theme: Theme,
  selector: string,
  styles: TStyles
) => {
  [selector: string]: CSSInterpolation;
};

export type TGetBreakpoint = (index: number) => string;
