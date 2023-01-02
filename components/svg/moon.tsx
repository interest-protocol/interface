import { FC } from 'react';

import { SVGProps } from './svg.types';

const Moon: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
    viewBox="0 0 256 256"
    {...props}
  >
    <defs></defs>
    <g
      style={{
        stroke: 'none',
        strokeWidth: 0,
        strokeDasharray: 'none',
        strokeLinecap: 'butt',
        strokeLinejoin: 'miter',
        strokeMiterlimit: 10,
        fill: 'none',
        fillRule: 'nonzero',
        opacity: 1,
      }}
      transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
    >
      <path
        d="M 89.634 59.683 c -0.338 -0.276 -0.816 -0.302 -1.184 -0.062 c -16.514 10.864 -38.661 8.589 -52.661 -5.41 C 21.79 40.212 19.515 18.065 30.38 1.551 c 0.24 -0.366 0.215 -0.845 -0.062 -1.183 c -0.277 -0.339 -0.741 -0.46 -1.148 -0.294 c -5.826 2.349 -11.048 5.809 -15.523 10.283 c -18.195 18.195 -18.195 47.802 0 65.997 C 22.744 85.451 34.695 90 46.645 90 c 11.951 0 23.901 -4.549 32.999 -13.646 c 4.475 -4.476 7.935 -9.699 10.284 -15.523 C 90.091 60.425 89.972 59.96 89.634 59.683 z"
        style={{
          stroke: 'none',
          strokeWidth: 1,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter',
          strokeMiterlimit: 10,
          fill: props.fill,
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform=" matrix(1 0 0 1 0 0) "
        strokeLinecap="round"
      />
    </g>
  </svg>
);

export default Moon;
