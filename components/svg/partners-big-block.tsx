import { FC } from 'react';

import { SVGProps } from './svg.types';

const PartnersBigBlock: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    style={{ maxHeight, maxWidth }}
    viewBox="0 0 339 392"
    fill="none"
    {...props}
  >
    <path
      opacity="0.1"
      d="M169.5 0L339 98V294L169.5 392L0 294V98L169.5 0Z"
      fill="url(#paint0_linear_612_7)"
    />
    <path
      opacity="0.1"
      d="M169.5 0L339 98V99L169.5 197L0 99V98L169.5 0Z"
      fill="url(#paint1_linear_612_7)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_612_7"
        x1="169.5"
        y1="0"
        x2="169.5"
        y2="392"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#111111" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_612_7"
        x1="169.5"
        y1="0"
        x2="169.5"
        y2="392"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#111111" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default PartnersBigBlock;
