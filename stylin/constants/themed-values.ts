import { CSSProperties } from 'react';

import { Theme } from '@/design-system/landing-page-theme';

export const THEMED_VALUES_MAP: Partial<
  Record<
    keyof CSSProperties,
    keyof Pick<
      Theme,
      'radii' | 'space' | 'colors' | 'fontSizes' | 'breakpoints'
    >
  >
> = {
  margin: 'space',
  marginTop: 'space',
  marginRight: 'space',
  marginBottom: 'space',
  marginLeft: 'space',
  padding: 'space',
  paddingTop: 'space',
  paddingRight: 'space',
  paddingBottom: 'space',
  paddingLeft: 'space',
  fontSize: 'fontSizes',
  color: 'colors',
  borderColor: 'colors',
  borderTopColor: 'colors',
  borderLeftColor: 'colors',
  borderBlockColor: 'colors',
  borderRightColor: 'colors',
  borderBottomColor: 'colors',
  borderInlineColor: 'colors',
  borderBlockEndColor: 'colors',
  borderInlineEndColor: 'colors',
  borderBlockStartColor: 'colors',
  borderInlineStartColor: 'colors',
  background: 'colors',
  backgroundColor: 'colors',
  borderRadius: 'radii',
  borderEndEndRadius: 'radii',
  borderTopLeftRadius: 'radii',
  borderTopRightRadius: 'radii',
  borderEndStartRadius: 'radii',
  borderStartEndRadius: 'radii',
  borderBottomLeftRadius: 'radii',
  borderStartStartRadius: 'radii',
  borderBottomRightRadius: 'radii',
};
