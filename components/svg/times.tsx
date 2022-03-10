import { FC, SVGAttributes } from 'react';

const Times: FC<SVGAttributes<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 35 35" fill="none" {...props}>
    <line
      x1="9.25"
      y1="26.1445"
      x2="25.5135"
      y2="9.881"
      stroke="#A3A3A3"
      strokeLinecap="round"
    />
    <line
      x1="25.5116"
      y1="25.7207"
      x2="9.24819"
      y2="9.45725"
      stroke="#A3A3A3"
      strokeLinecap="round"
    />
  </svg>
);

export default Times;
