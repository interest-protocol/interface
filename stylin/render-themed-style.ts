/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { CSSProperties } from 'react';

import { Theme } from '@/design-system/landing-page-theme';

// @ts-ignore
const THEMED_VALUES_MAP: Record<keyof Partial<CSSProperties>, string> = {
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

const renderThemedStyle = (
  theme: Theme,
  property: keyof CSSProperties,
  style: string | number
): string | number => {
  if (THEMED_VALUES_MAP[property])
    // @ts-ignore
    return theme[THEMED_VALUES_MAP[property]]?.[style] ?? style;

  return style;
};

export default renderThemedStyle;
