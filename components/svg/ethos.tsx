import { FC } from 'react';

import { SVGProps } from './svg.types';

const Ethos: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 30 41"
    fill="none"
    {...props}
  >
    <path
      d="M3.83261 0.638184H25.5336C27.2962 0.638184 28.7251 2.06706 28.7251 3.82967V28.6228C28.7251 30.3854 27.2962 31.8142 25.5336 31.8142H3.8326C2.06999 31.8142 0.641113 30.3854 0.641113 28.6228V3.82967C0.641113 2.06706 2.07 0.638184 3.83261 0.638184Z"
      stroke="url(#paint0_linear_606_7)"
      strokeWidth="1.2766"
    />
    <path
      d="M4.26851 2.32731L19.572 9.44824C20.4723 9.86715 21.0481 10.7701 21.0481 11.7631V37.455C21.0481 39.3025 19.1466 40.5384 17.4582 39.7883L2.1547 32.9889C1.23252 32.5792 0.638184 31.6648 0.638184 30.6557V4.64216C0.638184 2.77543 2.57603 1.53978 4.26851 2.32731Z"
      fill="currentColor"
    />
    <defs>
      <linearGradient
        id="paint0_linear_606_7"
        x1="28.7251"
        y1="8.93606"
        x2="14.6825"
        y2="15.9573"
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset="1" stopColor="currentColor" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default Ethos;
