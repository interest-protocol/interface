import { FC, SVGAttributes } from 'react';

const SynthApple: FC<SVGAttributes<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 85 85" fill="none" {...props}>
    <g filter="url(#filter0_i_0_1)">
      <path
        d="M42.5 85C65.971 85 85 65.9706 85 42.5C85 19.0294 65.971 0 42.5 0C19.0294 0 0 19.0294 0 42.5C0 65.9706 19.0294 85 42.5 85Z"
        fill="url(#paint0_linear_0_1)"
      />
    </g>
    <g clipPath="url(#clip0_0_1)">
      <path
        d="M52.2199 42.6195C52.27 48.2081 56.9482 50.0679 57 50.0916C56.9604 50.2228 56.2525 52.7419 54.5353 55.344C53.0509 57.5937 51.5102 59.8351 49.0832 59.8816C46.6984 59.9271 45.9316 58.4152 43.2051 58.4152C40.4795 58.4152 39.6275 59.8351 37.3701 59.9271C35.0274 60.019 33.2435 57.4944 31.7467 55.253C28.6882 50.6681 26.3509 42.2971 29.4893 36.6466C31.0484 33.8405 33.8347 32.0636 36.8589 32.018C39.1593 31.9725 41.3307 33.6228 42.737 33.6228C44.1423 33.6228 46.781 31.6382 49.5549 31.9297C50.7161 31.9798 53.9758 32.4161 56.0689 35.5929C55.9002 35.7013 52.1795 37.9472 52.2199 42.6195M47.738 28.8964C48.9818 27.3353 49.8189 25.1622 49.5905 23C47.7977 23.0747 45.6299 24.2387 44.344 25.7989C43.1916 27.1805 42.1823 29.3918 42.4546 31.5113C44.4529 31.6716 46.4942 30.4584 47.738 28.8964"
        fill="black"
      />
    </g>
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
      <clipPath id="clip0_0_1">
        <rect
          width="29"
          height="37"
          fill="white"
          transform="translate(28 23)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default SynthApple;
