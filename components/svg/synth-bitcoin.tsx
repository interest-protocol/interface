import { FC, SVGAttributes } from 'react';

const SynthBitcoin: FC<SVGAttributes<SVGSVGElement>> = (props) => (
  <svg viewBox="65 20 88 90" fill="none" {...props}>
    <g filter="url(#filter0_d_118_524)">
      <path
        d="M150.728 75.781C145.052 98.549 121.989 112.405 99.2152 106.728C76.4514 101.051 62.5936 77.9896 68.273 55.2234C73.9473 32.4528 97.0103 18.5956 119.777 24.2717C142.548 29.9479 156.405 53.0122 150.728 75.7814L150.728 75.781H150.728Z"
        fill="url(#paint0_linear_118_524)"
      />
    </g>
    <path
      d="M126.407 60.4939C127.149 55.5816 123.369 52.941 118.199 51.1795L119.876 44.5253L115.782 43.516L114.149 49.995C113.073 49.7294 111.967 49.4792 110.869 49.2311L112.513 42.7093L108.421 41.7L106.743 48.352C105.852 48.1514 104.978 47.9531 104.129 47.7442L104.133 47.7232L98.4871 46.3284L97.3979 50.6547C97.3979 50.6547 100.436 51.3435 100.372 51.3859C102.03 51.7953 102.33 52.8811 102.28 53.7418L100.369 61.3225C100.484 61.3512 100.632 61.3927 100.795 61.4576C100.659 61.424 100.513 61.3874 100.362 61.3517L97.6848 71.9712C97.4822 72.4695 96.9678 73.2174 95.8086 72.9334C95.8496 72.9922 92.8327 72.1987 92.8327 72.1987L90.7998 76.8353L96.1281 78.1494C97.1194 78.3953 98.0908 78.6526 99.0474 78.8945L97.353 85.625L101.443 86.6344L103.121 79.9753C104.238 80.2754 105.322 80.5521 106.384 80.813L104.711 87.4407L108.806 88.45L110.5 81.7321C117.482 83.0393 122.732 82.5123 124.942 76.2648C126.723 71.2348 124.853 68.3335 121.18 66.4416C123.856 65.8312 125.871 64.0904 126.408 60.4945L126.407 60.4936L126.407 60.4939ZM117.052 73.4714C115.786 78.5014 107.225 75.7823 104.45 75.1005L106.698 66.1837C109.474 66.8692 118.374 68.2256 117.052 73.4714H117.052ZM118.318 60.421C117.164 64.9963 110.038 62.6719 107.727 62.1019L109.766 54.015C112.077 54.5849 119.52 55.6487 118.318 60.421H118.318Z"
      fill="#10379A"
    />
    <defs>
      <filter
        id="filter0_d_118_524"
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
          result="effect1_dropShadow_118_524"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_118_524"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_118_524"
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

export default SynthBitcoin;
