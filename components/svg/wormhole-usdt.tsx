import { FC } from 'react';

import { SVGProps } from './svg.types';

const WormholeUSDT: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_306_518)">
      <path
        d="M32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16Z"
        fill="#211D42"
      />
      <path
        d="M13.7313 14.1988V9.36758H7.17871V5.13281H25.4893V9.42723H18.9367V14.1988H13.7313Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.36157 14.7361C4.36157 13.1257 9.62817 11.8135 16.1808 11.8135C22.7334 11.8135 28 13.1257 28 14.7361C28 16.3465 22.7334 17.6587 16.1808 17.6587C9.62817 17.6587 4.36157 16.3465 4.36157 14.7361ZM27.0201 14.736C26.5914 14.1395 23.0395 12.2905 16.1807 12.2905C9.32189 12.2905 5.77 14.0799 5.34132 14.736C5.77 15.3324 9.32189 16.2271 16.1807 16.2271C23.1008 16.2271 26.5914 15.3324 27.0201 14.736Z"
        fill="white"
      />
      <path
        d="M18.9364 15.6899V12.3498C18.079 12.2902 17.1604 12.2305 16.2418 12.2305C15.3845 12.2305 14.5883 12.2305 13.7922 12.2902V15.6303C14.5271 15.6303 15.3845 15.6899 16.2418 15.6899C17.1604 15.7496 18.079 15.7496 18.9364 15.6899Z"
        fill="white"
      />
      <path
        d="M16.1808 17.6584C15.3234 17.6584 14.5273 17.6584 13.7312 17.5987V26.4858H18.8753V17.5391C18.018 17.5987 17.0994 17.6584 16.1808 17.6584Z"
        fill="white"
      />
      <path
        d="M29 6C29 4.34315 27.6569 3 26 3C24.3431 3 23 4.34315 23 6C23 7.65685 24.3431 9 26 9C27.6569 9 29 7.65685 29 6Z"
        fill="white"
      />
      <path
        d="M29 6C29 4.34315 27.6569 3 26 3C24.3431 3 23 4.34315 23 6C23 7.65685 24.3431 9 26 9C27.6569 9 29 7.65685 29 6Z"
        stroke="#211D42"
        strokeWidth="2"
      />
    </g>
    <defs>
      <clipPath id="clip0_306_518">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default WormholeUSDT;
