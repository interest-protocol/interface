import { FC } from 'react';

import { SVGProps } from './svg.types';

const HorizontalDots: FC<SVGProps> = ({ maxSize, ...props }) => (
  <svg
    style={{ maxWidth: maxSize, maxHeight: maxSize }}
    viewBox="0 0 34 8"
    fill="none"
    {...props}
  >
    <circle cx="4" cy="4" r="4" fill="currentColor" />
    <circle cx="17" cy="4" r="4" fill="currentColor" />
    <circle cx="30" cy="4" r="4" fill="currentColor" />
  </svg>
);

export default HorizontalDots;
