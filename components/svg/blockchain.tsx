import { FC } from 'react';

import { SVGProps } from './svg.types';

const Blockchain: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
    viewBox="0 0 48 48"
    fill="none"
    {...props}
  >
    <path
      d="M40 30.0002V15.0002L27.5 7.96924M20.5 7.96924L8 15.0002V30.0002M11 34.6882L24 42.0002L32 37.5002L37 34.6872M24 17.0002V10.0002M30 27.0002L37 31.0002M18 27.0002L11 31.0002M21 18.7502L18 20.5002V27.5002L21 29.2502L24 31.0002L27 29.2502L30 27.5002V20.5002L27 18.7502L24 17.0002L21 18.7502Z"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 10C25.6569 10 27 8.65685 27 7C27 5.34315 25.6569 4 24 4C22.3431 4 21 5.34315 21 7C21 8.65685 22.3431 10 24 10Z"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 36C9.65685 36 11 34.6569 11 33C11 31.3431 9.65685 30 8 30C6.34315 30 5 31.3431 5 33C5 34.6569 6.34315 36 8 36Z"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M40 36C41.6569 36 43 34.6569 43 33C43 31.3431 41.6569 30 40 30C38.3431 30 37 31.3431 37 33C37 34.6569 38.3431 36 40 36Z"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Blockchain;
