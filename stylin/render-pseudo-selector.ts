import { CSSInterpolation } from '@emotion/serialize';

import renderResponsiveStyle from './render-responsive-style';
import { TRenderPseudoSelector, TStyleKeys } from './stylin.types';

const renderPseudoSelector: TRenderPseudoSelector = (selector, styles) => ({
  [`:${selector}`]: Object.entries(styles).reduce(
    (acc, [prop, value]) =>
      acc.concat(renderResponsiveStyle(prop as TStyleKeys, value)),
    [] as Array<CSSInterpolation>
  ),
});

export default renderPseudoSelector;
