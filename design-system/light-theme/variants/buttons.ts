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
  padding: ${space.L} ${space.XL};
  background: linear-gradient(180deg, #0055ff 0%, #0055ff 100%);
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
