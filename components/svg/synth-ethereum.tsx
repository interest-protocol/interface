import { FC, SVGAttributes } from 'react';

const SynthEthereum: FC<SVGAttributes<SVGSVGElement>> = (props) => (
  <svg viewBox="65 20 88 90" fill="none" {...props}>
    <g filter="url(#filter0_d_0_1)">
      <path
        d="M150.728 75.781C145.052 98.549 121.989 112.405 99.2152 106.728C76.4514 101.051 62.5936 77.9896 68.273 55.2234C73.9473 32.4528 97.0103 18.5956 119.777 24.2717C142.548 29.9479 156.405 53.0122 150.728 75.7814L150.728 75.781H150.728Z"
        fill="url(#paint0_linear_0_1)"
      />
    </g>
    <path
      d="M109.354 34.9521L108.955 36.308V75.6494L109.354 76.0477L127.626 65.2531L109.354 34.9521Z"
      fill="#5795F1"
    />
    <path
      d="M109.35 34.9519L91.0771 65.2529L109.35 76.0475V56.9522V34.9519Z"
      fill="#85B9EE"
    />
    <path
      d="M109.354 79.507L109.129 79.7813V93.7953L109.354 94.4521L127.637 68.718L109.354 79.507Z"
      fill="#4986F0"
    />
    <path
      d="M109.35 94.4521V79.507L91.0771 68.718L109.35 94.4521Z"
      fill="#85B9EE"
    />
    <path
      d="M109.361 76.0473L127.633 65.2528L109.361 56.9521V76.0473Z"
      fill="#10379A"
    />
    <path
      d="M91.0771 65.2528L109.35 76.0473V56.9521L91.0771 65.2528Z"
      fill="#4986F0"
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

export default SynthEthereum;
