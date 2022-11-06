import { filter, keys, toPairs } from 'ramda';

import breakpoints from '@/design-system/common/breakpoints';
import { TStyles } from '@/stylin/stylin.types';

import { CSS_STYLING_MAP } from './constants';
import { CSSPseudoSelectors } from './constants/css-pseudo-selectors';
import {
  TGetBreakpoint,
  TPseudoKeys,
  TStyleKeys,
  TStyleValue,
} from './stylin.types';

export const getBreakpoint: TGetBreakpoint = (index) =>
  breakpoints[
    index < breakpoints.length - 1 ? index - 1 : breakpoints.length - 1
  ];

export const getStyles = (
  styles: TStyles
): ReadonlyArray<[TStyleKeys, TStyleValue]> =>
  filter((pair) => CSS_STYLING_MAP.includes(pair[0]), toPairs(styles));

export const getPseudos = (
  styles: TStyles
): ReadonlyArray<[TPseudoKeys, TStyles]> =>
  filter((pair) => keys(CSSPseudoSelectors).includes(pair[0]), toPairs(styles));

export const isFunction = (functionToCheck: unknown): boolean =>
  !!functionToCheck &&
  {}.toString.call(functionToCheck) === '[object Function]';
