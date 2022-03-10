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

export default {
  primary,
};
