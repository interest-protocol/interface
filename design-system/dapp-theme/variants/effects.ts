import { css } from '@emotion/react';

import colors from '../colors';

const hover = css`
  &:hover {
    box-shadow: 0 0 5px 1px ${colors.accent};
  }
`;

export default {
  hover,
};
