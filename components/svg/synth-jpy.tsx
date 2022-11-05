import { FC, SVGAttributes } from 'react';

const SynthJPY: FC<SVGAttributes<SVGSVGElement>> = (props) => (
  <svg viewBox="65 20 88 90" fill="none" {...props}>
    <g filter="url(#filter0_d_0_1)">
      <path
        d="M109.5 108C132.971 108 152 88.9706 152 65.5C152 42.0294 132.971 23 109.5 23C86.0294 23 67 42.0294 67 65.5C67 88.9706 86.0294 108 109.5 108Z"
        fill="url(#paint0_linear_0_1)"
      />
    </g>
    <path
      d="M109.5 83.977C114.4 83.9742 119.098 82.0266 122.562 78.5622C126.027 75.0977 127.974 70.3997 127.977 65.5002C127.974 60.6007 126.027 55.9026 122.562 52.4381C119.098 48.9737 114.4 47.0261 109.5 47.0233C104.601 47.0261 99.9028 48.9737 96.4383 52.4381C92.9738 55.9026 91.0263 60.6007 91.0234 65.5002C91.0263 70.3997 92.9738 75.0977 96.4383 78.5622C99.9028 82.0266 104.601 83.9742 109.5 83.977Z"
      fill="#D80027"
    />
    <defs>
      <filter
        id="filter0_d_0_1"
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
        x1="88.675"
        y1="23"
        x2="123.525"
        y2="135.625"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#9AB6F1" />
      </linearGradient>
    </defs>
  </svg>
);

export default SynthJPY;
