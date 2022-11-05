import { SerializedStyles } from '@emotion/react';
import { CSSInterpolation } from '@emotion/serialize';
import { CSSProperties } from 'react';
import { ResponsiveValue } from 'styled-system';

import { Theme } from '@/design-system/landing-page-theme';

type TStyleEffect = 'hover' | 'active';

type TStyleValue = ResponsiveValue<string | number>;

export type TStyleKeys = keyof CSSProperties;

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
  prop: TStyleKeys,
  value: TStyleValue
) => Array<CSSInterpolation>;

export type TRenderPseudoSelector = (
  selector: string,
  styles: RenderStylesProps['styles']
) => {
  [selector: string]: CSSInterpolation;
};

export type TGetBreakpoint = (index: number) => string;
