import { css } from '@emotion/react';

import colors from '../colors';

const hover = css`
  &:hover {
    color: ${colors.text};
    background: ${colors.accent};
  }
  &:active {
    color: ${colors.text};
    background: ${colors.accentActive};
  }
`;

export default {
  hover,
};
