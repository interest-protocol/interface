import { FC } from 'react';

import { SVGProps } from './svg.types';

const Warning: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 47 40"
    fill="none"
    {...props}
  >
    <path
      d="M22.464 28.28L22.016 12.6H24.704L24.224 28.28H22.464ZM23.36 35.16C22.8907 35.16 22.4853 35 22.144 34.68C21.824 34.3387 21.664 33.944 21.664 33.496C21.664 33.0267 21.824 32.6427 22.144 32.344C22.4853 32.024 22.8907 31.864 23.36 31.864C23.8507 31.864 24.2453 32.024 24.544 32.344C24.864 32.6427 25.024 33.0267 25.024 33.496C25.024 33.944 24.864 34.3387 24.544 34.68C24.2453 35 23.8507 35.16 23.36 35.16Z"
      fill="currentColor"
    />
    <path
      d="M45.5836 39.25L23.5 0.999999L1.41636 39.25H45.5836Z"
      stroke="currentColor"
    />
  </svg>
);
export default Warning;
