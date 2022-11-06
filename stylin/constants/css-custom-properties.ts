import type { CSSProperties } from 'react';

import { StylinCustomProperties } from '../stylin.types';

export const CUSTOM_PROPERTY_MAP: Record<
  StylinCustomProperties,
  ReadonlyArray<keyof CSSProperties>
> = {
  [StylinCustomProperties.bg]: ['background'],
  [StylinCustomProperties.m]: ['margin'],
  [StylinCustomProperties.my]: ['marginTop', 'marginBottom'],
  [StylinCustomProperties.mx]: ['marginLeft', 'marginRight'],
  [StylinCustomProperties.mt]: ['marginTop'],
  [StylinCustomProperties.mr]: ['marginRight'],
  [StylinCustomProperties.mb]: ['marginBottom'],
  [StylinCustomProperties.ml]: ['marginLeft'],
  [StylinCustomProperties.p]: ['padding'],
  [StylinCustomProperties.px]: ['paddingLeft', 'paddingRight'],
  [StylinCustomProperties.py]: ['paddingTop', 'paddingBottom'],
  [StylinCustomProperties.pt]: ['paddingTop'],
  [StylinCustomProperties.pr]: ['paddingRight'],
  [StylinCustomProperties.pb]: ['paddingBottom'],
  [StylinCustomProperties.pl]: ['paddingLeft'],
};
