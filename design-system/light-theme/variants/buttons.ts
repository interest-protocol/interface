import { css } from '@emotion/react';

import fontSizes from '../../common/font-sizes';
import space from '../../common/space';
import colors from '../colors';

const primary = css`
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  display: inline-block;
  border-radius: 0.625rem;
  font-size: ${fontSizes.M};
  color: ${colors.foreground};
  border: 2px solid transparent;
  padding: ${space.L} ${space.XL};
  background: linear-gradient(#0055ff, #0055ff) padding-box,
    linear-gradient(to top, #002f8e, #ffffff) border-box;
`;

const secondary = css`
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  display: inline-block;
  color: ${colors.accent};
  border-radius: 0.625rem;
  font-size: ${fontSizes.M};
  padding: ${space.L} ${space.XL};
  background: ${colors.foreground};
  border: 2px solid ${colors.accent};
`;

export default {
  primary,
  secondary,
};
