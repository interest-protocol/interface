import { FC } from 'react';

import { SVGProps } from './svg.types';

const CompoundEther: FC<SVGProps> = ({ maxSize, ...props }) => (
  <svg
    style={{ maxWidth: maxSize, maxHeight: maxSize }}
    viewBox="0 0 256 256"
    fill="none"
    {...props}
  >
    <path
      d="M128.099 256.1C198.736 256.1 255.999 198.837 255.999 128.2C255.999 57.5626 198.736 0.299805 128.099 0.299805C57.462 0.299805 0.199219 57.5626 0.199219 128.2C0.199219 198.837 57.462 256.1 128.099 256.1Z"
      fill="#EDF0F2"
    />
    <path
      d="M209.3 226.9C189.8 243 165.9 252.9 140.7 255.3C107 258.6 73.2997 248.4 46.9997 226.9C20.7997 205.4 4.19968 174.4 0.799681 140.6C-1.70032 115.4 3.29968 90.1001 15.1997 67.8001C27.0997 45.5001 45.3997 27.2001 67.6997 15.3001C89.9997 3.40007 115.3 -1.69993 140.5 0.80007C165.7 3.30007 189.5 13.1001 209.1 29.2001L183.3 60.7001C170 49.8001 153.7 43.0001 136.5 41.4001C119.3 39.7001 102.1 43.2001 86.8997 51.3001C71.6997 59.4001 59.2997 71.9001 51.0997 87.1001C42.9997 102.3 39.5997 119.6 41.2997 136.7C43.5997 159.7 54.8997 180.9 72.7997 195.5C90.6997 210.2 113.7 217.1 136.7 214.8C153.9 213.1 170.1 206.3 183.4 195.4L209.3 226.9Z"
      fill="url(#paint0_linear_1419_28)"
    />
    <path
      d="M128.5 232.9C186.2 232.9 232.9 186.1 232.9 128.5C232.9 70.8 186.2 24 128.5 24C70.8 24 24 70.8 24 128.5C24 186.2 70.8 232.9 128.5 232.9Z"
      fill="white"
    />
    <path d="M129.2 147.9L162.3 128.7L123 108.5L129.2 147.9Z" fill="#AAB8C1" />
    <path
      d="M96.1992 128.801L129.299 148.001V112.601L96.1992 128.801Z"
      fill="#AAB8C1"
    />
    <path
      d="M129.2 74.9004L96.0996 128.8L139.4 109.5L129.2 74.9004Z"
      fill="#283947"
    />
    <path
      d="M129.199 74.9004V114L162.299 128.8L129.199 74.9004Z"
      fill="#657786"
    />
    <path
      d="M129.199 180.7L133.499 156.5L96.1992 134.9L129.199 180.7Z"
      fill="#283947"
    />
    <path
      d="M129.199 154.1V180.7L162.299 134.9L129.199 154.1Z"
      fill="#657786"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1419_28"
        x1="92.0936"
        y1="14.3456"
        x2="132.188"
        y2="236.639"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#27D3A2" />
        <stop offset="1" stopColor="#9388FD" />
      </linearGradient>
    </defs>
  </svg>
);

export default CompoundEther;
