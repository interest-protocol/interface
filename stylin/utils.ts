import { filter, toPairs } from 'ramda';

import breakpoints from '@/design-system/common/breakpoints';
import { TStyles } from '@/stylin/stylin.types';

import { CSS_STYLING_MAP } from './constants';
import { TGetBreakpoint, TStyleKeys, TStyleValue } from './stylin.types';

export const getBreakpoint: TGetBreakpoint = (index) =>
  breakpoints[
    index < breakpoints.length - 1 ? index - 1 : breakpoints.length - 1
  ];

export const getStyles = (
  styles: TStyles
): ReadonlyArray<[TStyleKeys, TStyleValue]> =>
  filter((pair) => CSS_STYLING_MAP.includes(pair[0]), toPairs(styles));
