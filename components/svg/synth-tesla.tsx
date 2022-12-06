import { FC, SVGAttributes } from 'react';

const SynthTesla: FC<SVGAttributes<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 85 85" fill="none" {...props}>
    <g filter="url(#filter0_i_0_1)">
      <path
        d="M42.5 85C65.971 85 85 65.9706 85 42.5C85 19.0294 65.971 0 42.5 0C19.0294 0 0 19.0294 0 42.5C0 65.9706 19.0294 85 42.5 85Z"
        fill="url(#paint0_linear_0_1)"
      />
    </g>
    <path
      d="M42.3806 61.0002L47.8028 30.5057C52.9711 30.5057 54.6013 31.0724 54.8366 33.3856C54.8366 33.3856 58.3036 32.0929 60.0523 29.4674C53.2286 26.3055 46.3723 26.1629 46.3723 26.1629L42.3716 31.0357L42.3806 31.0351L38.3799 26.1621C38.3799 26.1621 31.5235 26.3049 24.7007 29.4668C26.4478 32.0923 29.9162 33.385 29.9162 33.385C30.1529 31.0716 31.7812 30.5049 36.9147 30.5012L42.3806 61.0002"
      fill="#E82127"
    />
    <path
      d="M42.3789 24.7549C47.8949 24.7127 54.2086 25.6082 60.6719 28.4252C61.5357 26.8703 61.7578 26.1831 61.7578 26.1831C54.6925 23.3878 48.0759 22.4312 42.3781 22.4072C36.6807 22.4312 30.0644 23.388 23 26.1831C23 26.1831 23.3152 27.0296 24.0852 28.4252C30.5472 25.6082 36.862 24.7127 42.3781 24.7549H42.3789Z"
      fill="#E82127"
    />
    <defs>
      <filter
        id="filter0_i_0_1"
        x="0"
        y="0"
        width="85"
        height="129.177"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="44.177" />
        <feGaussianBlur stdDeviation="33.1328" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
        />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_0_1" />
      </filter>
      <linearGradient
        id="paint0_linear_0_1"
        x1="21.675"
        y1="1.67001e-07"
        x2="56.525"
        y2="112.625"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#9AB6F1" />
      </linearGradient>
    </defs>
  </svg>
);

export default SynthTesla;
