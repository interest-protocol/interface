import { css } from '@emotion/react';

const title1 = css`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  font-size: 2.18rem;
  @media (min-width: 40em) {
    font-size: 3.125rem;
  }
`;

const title2 = css`
  font-size: 2.5rem;F
`;

const title3 = css`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  font-size: 1.2rem;
`;

const normal = css`
  font-size: 1rem;
`;

export default {
  title1,
  title2,
  title3,
  normal,
};
