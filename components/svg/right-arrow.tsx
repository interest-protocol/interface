import { FC, SVGAttributes } from 'react';

const RightArrow: FC<SVGAttributes<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 10 8" fill="none" {...props}>
    <path
      d="M5.4517 8L4.79545 7.35227L7.49716 4.65057H0.5V3.71307H7.49716L4.79545 1.01989L5.4517 0.363636L9.26989 4.18182L5.4517 8Z"
      fill="currentColor"
    />
  </svg>
);

export default RightArrow;
