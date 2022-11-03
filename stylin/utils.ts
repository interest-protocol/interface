import breakpoints from '@/design-system/common/breakpoints';

import { TGetBreakpoint } from './stylin.types';

export const getBreakpoint: TGetBreakpoint = (index) =>
  breakpoints[
    index < breakpoints.length - 1 ? index - 1 : breakpoints.length - 1
  ];
