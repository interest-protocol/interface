import { FC, SVGAttributes } from 'react';

const WBNB: FC<SVGAttributes<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 511.97 511.97" {...props}>
    <path
      fill="#ffffff"
      d="M156.56 215.14 256 115.71l99.47 99.47 57.86-57.85L256 0 98.71 157.28l57.85 57.85M0 256l57.86-57.87L115.71 256l-57.86 57.83Zm156.56 40.85L256 396.27l99.47-99.47 57.89 57.82L256 512 98.71 354.7l-.08-.09 57.93-57.77M396.27 256l57.85-57.85L512 256l-57.85 57.85Z"
    />
    <path
      fill="#ffffff"
      d="M314.66 256 256 197.25l-43.4 43.38-5 5-10.27 10.27-.08.08.08.08L256 314.72l58.7-58.7h-.05"
    />
  </svg>
);

export default WBNB;
