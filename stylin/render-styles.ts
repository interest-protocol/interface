import { css } from '@emotion/react';
import { CSSInterpolation } from '@emotion/serialize';

import renderPseudoSelector from './render-pseudo-selector';
import renderResponsiveStyle from './render-responsive-style';
import { TRenderStyles, TStyleKeys } from './stylin.types';

const renderStyles: TRenderStyles = ({ styles, pseudo }) =>
  css(
    ...Object.entries(styles).reduce(
      (acc, [prop, value]) =>
        acc.concat(renderResponsiveStyle(prop as TStyleKeys, value)),
      [] as Array<CSSInterpolation>
    ),
    ...Object.entries(pseudo).reduce(
      (acc, [selector, pseudoStyles]) =>
        acc.concat(renderPseudoSelector(selector, pseudoStyles)),
      [] as Array<Record<string, CSSInterpolation>>
    )
  );

export default renderStyles;
