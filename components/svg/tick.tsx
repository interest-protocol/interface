import { FC } from 'react';

import { SVGProps } from './svg.types';

const Tick: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    <circle cx="16" cy="16" r="16" fill="#0055FF" />
    <path d="M10 16L14.5 20.5L24 11" stroke="#F5F7F8" strokeWidth="1.5" />
  </svg>
);

export default Tick;
