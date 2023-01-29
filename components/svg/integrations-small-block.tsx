import { FC } from 'react';

import { SVGProps } from './svg.types';

const IntegrationsSmallBlock: FC<SVGProps> = ({
  maxHeight,
  maxWidth,
  ...props
}) => (
  <svg
    style={{ maxHeight, maxWidth }}
    viewBox="0 0 126 185"
    fill="none"
    {...props}
  >
    <path
      opacity="0.1"
      d="M62.6977 0L125.395 36.25V148.75L62.6977 185L0 148.75V36.25L62.6977 0Z"
      fill="url(#paint0_linear_97_48)"
    />
    <path
      opacity="0.1"
      d="M62.6977 0L125.395 36.25V36.6199L62.6977 72.8699L0 36.6199V36.25L62.6977 0Z"
      fill="url(#paint1_linear_97_48)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_97_48"
        x1="62.6977"
        y1="0"
        x2="62.6977"
        y2="145"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#111111" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_97_48"
        x1="62.6977"
        y1="0"
        x2="62.6977"
        y2="145"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#111111" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default IntegrationsSmallBlock;
