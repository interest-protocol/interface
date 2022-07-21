import { css } from '@emotion/react';

const hover = css`
  &:hover {
    transform: scale(1.01);
    box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.3);
  }
`;

export default {
  hover,
};
