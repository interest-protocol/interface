import { FC, SVGAttributes } from 'react';

const Arrow: FC<SVGAttributes<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 8 8" {...props}>
    <path
      d="M7.41113 0.352L4.00313 7.168L0.595125 0.352H7.41113Z"
      fill="white"
    />
  </svg>
);

export default Arrow;
