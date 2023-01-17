import { FC } from 'react';

import { SVGProps } from './svg.types';

const Info: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
    viewBox="0 0 15 15"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0ZM8.00541 3.6H6.99741L7.16541 9.48H7.82541L8.00541 3.6ZM7.04541 11.88C7.17341 12 7.32541 12.06 7.50141 12.06C7.67741 12.06 7.82541 12 7.94541 11.88C8.06541 11.752 8.12541 11.604 8.12541 11.436C8.12541 11.26 8.06541 11.116 7.94541 11.004C7.82541 10.884 7.67741 10.824 7.50141 10.824C7.31741 10.824 7.16541 10.884 7.04541 11.004C6.92541 11.116 6.86541 11.26 6.86541 11.436C6.86541 11.604 6.92541 11.752 7.04541 11.88Z"
      fill="currentColor"
    />
  </svg>
);

export default Info;
