import { FC, SVGAttributes } from 'react';

const Back: FC<SVGAttributes<SVGSVGElement>> = (props) => (
  <svg
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

export default Back;
