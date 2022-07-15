import { css } from '@emotion/react';

import fontSizes from '@/design-system/common/font-sizes';

const title1 = css`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 900;
  line-height: 150%;
  font-size: 2.75rem;
  @media (min-width: 40em) {
    font-size: 2.75rem;
  }
`;

const title2 = css`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 800;
  line-height: 150%;
  font-size: 1.625rem;
  @media (min-width: 40em) {
    font-size: 2.25rem;
  }
`;

const title3 = css`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  font-size: 0.875rem;
  @media (min-width: 40em) {
    font-size: 1.5rem;
  }
`;

const title4 = css`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 22px;
`;

const large = css`
  font-size: ${fontSizes.L};
  line-height: 36px;
`;

const normal = css`
  font-size: ${fontSizes.M};
  line-height: 34px;
`;

const button = css`
  font-size: ${fontSizes.button};
  line-height: 24px;
`;

export default {
  title1,
  title2,
  title3,
  title4,
  normal,
  large,
  button,
};
