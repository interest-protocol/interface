import { FC } from 'react';

import { SVGProps } from './svg.types';

const Times: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
    viewBox="0 0 35 35"
    fill="none"
    {...props}
  >
    <line
      x1="9.25"
      y1="26.1445"
      x2="25.5135"
      y2="9.881"
      stroke="currentColor"
      strokeLinecap="round"
    />
    <line
      x1="25.5116"
      y1="25.7207"
      x2="9.24819"
      y2="9.45725"
      stroke="currentColor"
      strokeLinecap="round"
    />
  </svg>
);

export default Times;
