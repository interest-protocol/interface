import { SerializedStyles } from '@emotion/react';
import { CSSInterpolation } from '@emotion/serialize';
import { CSSProperties } from 'react';
import { ResponsiveValue } from 'styled-system';

type TStyleEffect = 'hover' | 'active';

type TStyleValue = ResponsiveValue<string | number>;

export type TStyleKeys = keyof CSSProperties;

export interface RenderStylesProps {
  styles: Record<TStyleKeys, TStyleValue>;
  pseudo: Record<TStyleEffect, RenderStylesProps['styles']>;
}

export type TRenderStyles = ({
  styles,
  pseudo,
}: RenderStylesProps) => SerializedStyles;

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
