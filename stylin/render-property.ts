import { CSSInterpolation } from '@emotion/serialize';
import { CSSProperties } from 'react';

import { Theme } from '@/design-system/landing-page-theme';

import { CUSTOM_PROPERTY_MAP } from './constants/css-custom-properties';
import renderThemedStyle from './render-themed-style';
import { StylinCustomProperties, TStyleKeys } from './stylin.types';

const renderProperty = (
  theme: Theme,
  prop: TStyleKeys,
  value: string | number
): CSSInterpolation => {
  if (StylinCustomProperties[prop])
    return (
      CUSTOM_PROPERTY_MAP[StylinCustomProperties[prop]] as ReadonlyArray<
        keyof CSSProperties
      >
    ).reduce(
      (acc, property) => ({
        ...acc,
        [property]: renderThemedStyle(theme, property, value),
      }),
      {}
    );

  return { [prop]: renderThemedStyle(theme, prop, value) };
};

export default renderProperty;
