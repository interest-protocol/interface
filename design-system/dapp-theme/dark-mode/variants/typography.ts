import { css } from '@emotion/react';

import fontSizes from '@/design-system/common/font-sizes';

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
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 2.18rem;
  line-height: 150%;
`;

const title3 = css`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
`;

const title4 = css`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
`;

const normal = css`
  font-size: 1rem;
`;

const small = css`
  font-size: ${fontSizes.S};
`;

export default {
  title1,
  title2,
  title3,
  title4,
  normal,
  small,
};
