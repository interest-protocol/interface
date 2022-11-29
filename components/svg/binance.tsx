import { FC } from 'react';
import { v4 } from 'uuid';

import { SVGProps } from './svg.types';

const id = v4();

const Binance: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M8.666 6.193L6.717 5.071 12.017 2l5.316 3.07-1.949 1.123-3.367-1.933-3.351 1.933zM18.72 8.126v2.26l1.949-1.122v-2.26L18.72 5.866l-1.948 1.122 1.948 1.138zM10.07 7.004l1.948 1.122 1.949-1.122-1.949-1.138-1.948 1.138zm7.264 1.933l-1.949-1.122-3.367 1.932-3.351-1.933-1.949 1.123v2.26l3.352 1.933v3.866l1.948 1.123 1.949-1.123V13.13l3.367-1.933v-2.26zm1.387 6.937l-3.351 1.933v2.26l5.316-3.07V10.87l-1.965 1.138v3.866zm-3.351.327l1.948-1.122v-2.276l-1.948 1.122v2.276zm-5.3 2.416v2.26L12.017 22l1.949-1.122v-2.26l-1.949 1.122-1.948-1.123zM3.35 9.264L5.3 10.387v-2.26l1.948-1.123-1.933-1.138-1.948 1.122v2.276H3.35zm1.964 2.744l-1.948-1.123v6.127l5.315 3.07v-2.26l-3.367-1.948v-3.866zm3.352 1.933l-1.949-1.123v2.26l1.949 1.123v-2.26z"
      fill={`url(#${id})`}
    ></path>
    <defs>
      <linearGradient
        id={id}
        x1="12.017"
        y1="2"
        x2="12.017"
        y2="22"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F8D12F"></stop>
        <stop offset="1" stopColor="#F0B90B"></stop>
      </linearGradient>
    </defs>
  </svg>
);
export default Binance;
