import { css } from '@emotion/react';
import { CSSInterpolation } from '@emotion/serialize';

import renderPseudoSelector from './render-pseudo-selector';
import renderResponsiveStyle from './render-responsive-style';
import { TRenderStyles, TStyleKeys, TStyleValue } from './stylin.types';
import { getStyles } from './utils';

const renderStyles: TRenderStyles = ({ styles, pseudo }, theme) =>
  css(
    ...getStyles(styles).reduce(
      (acc, [prop, value]) =>
        acc.concat(
          renderResponsiveStyle(theme, prop as TStyleKeys, value as TStyleValue)
        ),
      [] as Array<CSSInterpolation>
    ),
    ...Object.entries(pseudo).reduce(
      (acc, [selector, pseudoStyles]) =>
        acc.concat(renderPseudoSelector(theme, selector, pseudoStyles!)),
      [] as Array<Record<string, CSSInterpolation>>
    )
  );

export default renderStyles;
