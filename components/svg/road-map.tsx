import { FC, SVGAttributes } from 'react';

const RoadMap: FC<SVGAttributes<SVGSVGElement> & { next: Array<string> }> = ({
  next,
  ...props
}) => (
  <svg viewBox="0 0 952 304" fill="none" {...props}>
    <path d="M1 301L951 9" stroke="url(#paint0_linear_0_1)" strokeWidth="5" />
    {next.length > 0 && (
      <g>
        <circle cx="842.5" cy="45.5" r="42.5" fill="#0055FF" />
        <g filter="url(#filter0_d_0_1)">
          <text
            x="842.5"
            y="45.5"
            dy="-0.3em"
            fill="white"
            fontWeight="700"
            textAnchor="middle"
          >
            {next[0]}
          </text>
          <text
            fontWeight="700"
            x="842.5"
            y="45.5"
            dy="1em"
            fill="white"
            textAnchor="middle"
          >
            {next[1]}
          </text>
        </g>
      </g>
    )}
    <defs>
      <filter
        id="filter0_d_0_1"
        x="817.555"
        y="21.1836"
        width="51.4082"
        height="48.0332"
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
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0.144445 0 0 0 0 0.433333 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_0_1"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_0_1"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_0_1"
        x1="8"
        y1="299"
        x2="937.208"
        y2="-29.9588"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0055FF" stopOpacity="0" />
        <stop offset="0.0433453" stopColor="#0055FF" />
        <stop offset="0.932292" stopColor="#0055FF" />
        <stop offset="1" stopColor="#0055FF" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default RoadMap;
