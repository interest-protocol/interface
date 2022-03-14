import { FC, SVGAttributes } from 'react';

const Check: FC<SVGAttributes<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 14" {...props}>
    <line
      x1="0.707107"
      y1="4.60735"
      x2="7.77817"
      y2="11.6784"
      stroke="#0055FF"
      strokeWidth="2"
    />
    <line
      x1="7.29289"
      y1="12.6073"
      x2="18.6066"
      y2="1.29364"
      stroke="#0055FF"
      strokeWidth="2"
    />
  </svg>
);

export default Check;
