import { SerializedStyles } from '@emotion/react';

import { Theme } from '@/design-system/landing-page-theme';

type VariantKeys = Omit<
  Theme,
  'radii' | 'space' | 'colors' | 'fontSizes' | 'breakpoints'
>;

const renderVariant =
  (key: keyof VariantKeys) =>
  (variant: string | undefined, theme: Theme): SerializedStyles =>
    (theme[key] as Record<string, SerializedStyles>)?.[variant!] ??
    ({} as SerializedStyles);

export default renderVariant;
