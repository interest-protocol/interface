import { FC } from 'react';
import { v4 } from 'uuid';

import { SVGProps } from './svg.types';

const id = v4();

const SynthBRL: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
    viewBox="65 20 88 90"
    fill="none"
    {...props}
  >
    <g filter={`url(#${id}-filter)`}>
      <path
        d="M150.728 75.781C145.052 98.549 121.989 112.405 99.2152 106.728C76.4514 101.051 62.5936 77.9896 68.273 55.2234C73.9473 32.4528 97.0103 18.5956 119.777 24.2717C142.548 29.9479 156.405 53.0122 150.728 75.7814L150.728 75.781H150.728Z"
        fill={`url(#${id}-paint)`}
      />
    </g>
    <rect
      x="79.6113"
      y="35.4723"
      width="59.262"
      height="59.5"
      fill={`url(#${id}-pattern)`}
    />
    <defs>
      <filter
        id={`${id}-filter`}
        x="0.734474"
        y="0.911495"
        width="217.531"
        height="217.531"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="44.177" />
        <feGaussianBlur stdDeviation="33.1328" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_118_519"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_118_519"
          result="shape"
        />
      </filter>
      <pattern
        id={`${id}-pattern`}
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use
          xlinkHref={`#${id}-image`}
          transform="translate(-0.00200802) scale(0.00401606 0.004)"
        />
      </pattern>
      <linearGradient
        id={`${id}-paint`}
        x1="88.675"
        y1="23"
        x2="123.525"
        y2="135.625"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#9AB6F1" />
      </linearGradient>
      <image
        id={`${id}-image`}
        width="250"
        height="250"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);

export default SynthBRL;
