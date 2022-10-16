import { FC, SVGAttributes } from 'react';

const HorizontalDots: FC<SVGAttributes<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 34 8" fill="none" {...props}>
    <circle cx="4" cy="4" r="4" fill="currentColor" />
    <circle cx="17" cy="4" r="4" fill="currentColor" />
    <circle cx="30" cy="4" r="4" fill="currentColor" />
  </svg>
);

export default HorizontalDots;
