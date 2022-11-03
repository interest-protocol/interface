import { FC, SVGAttributes } from 'react';

const SynthCHF: FC<SVGAttributes<SVGSVGElement>> = (props) => (
  <svg viewBox="65 20 88 90" fill="none" {...props}>
    <g filter="url(#filter0_d_0_1)">
      <path
        d="M150.728 75.781C145.052 98.549 121.989 112.405 99.2152 106.728C76.4514 101.051 62.5936 77.9896 68.273 55.2234C73.9473 32.4528 97.0103 18.5956 119.777 24.2717C142.548 29.9479 156.405 53.0122 150.728 75.7814L150.728 75.781H150.728Z"
        fill="url(#paint0_linear_0_1)"
      />
    </g>
    <path
      d="M109.298 95.0483C125.728 95.0483 139.048 81.7277 139.048 65.2983C139.048 48.8688 125.728 35.5483 109.298 35.5483C92.8689 35.5483 79.5483 48.8688 79.5483 65.2983C79.5483 81.7277 92.8689 95.0483 109.298 95.0483Z"
      fill="#D80027"
    />
    <path
      d="M124.82 60.1242H114.472V49.7762H104.124V60.1242H93.7764V70.4723H104.124V80.8203H114.472V70.4723H124.82V60.1242Z"
      fill="#F0F0F0"
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

export default SynthCHF;
