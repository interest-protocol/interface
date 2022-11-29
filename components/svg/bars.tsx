import { FC } from 'react';

import { SVGProps } from './svg.types';

const Bars: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
    viewBox="0 0 26 22"
    fill="none"
    {...props}
  >
    <rect width="26" height="2" rx="1" fill="white" />
    <rect y="10" width="26" height="2" rx="1" fill="white" />
    <rect y="20" width="26" height="2" rx="1" fill="white" />
  </svg>
);

export default Bars;
