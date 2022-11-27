import { FC } from 'react';

import { SVGProps } from './svg.types';

const SynthGBP: FC<SVGProps> = ({ maxSize, ...props }) => (
  <svg
    style={{ maxWidth: maxSize, maxHeight: maxSize }}
    viewBox="65 20 88 90"
    fill="none"
    {...props}
  >
    <g filter="url(#filter0_d_118_528)">
      <path
        d="M150.728 75.781C145.052 98.549 121.989 112.405 99.2152 106.728C76.4514 101.051 62.5936 77.9896 68.273 55.2234C73.9473 32.4528 97.0103 18.5956 119.777 24.2717C142.548 29.9479 156.405 53.0122 150.728 75.7814L150.728 75.781H150.728Z"
        fill="url(#paint0_linear_118_528)"
      />
    </g>
    <path
      d="M109.079 94.4453C125.354 94.4453 138.55 81.2496 138.55 64.9742C138.55 48.6987 125.354 35.5031 109.079 35.5031C92.8031 35.5031 79.6074 48.6987 79.6074 64.9742C79.6074 81.2496 92.8031 94.4453 109.079 94.4453Z"
      fill="#F0F0F0"
    />
    <path
      d="M85.4241 46.9491C82.991 50.1098 81.2044 53.7189 80.1665 57.5701H96.046L85.4241 46.9491ZM139.109 57.5701C138.069 53.7202 136.283 50.1123 133.851 46.9516L123.229 57.5701H139.109ZM80.1665 73.4941C81.206 77.3439 82.9924 80.9519 85.4241 84.1126L96.0435 73.4941H80.1665ZM128.22 41.3206C125.101 38.9222 121.505 37.1139 117.6 36.061V51.9391L128.222 41.3206H128.22Z"
      fill="#0052B4"
    />
    <path
      d="M91.0557 89.7408C94.2163 92.1728 97.8246 93.9591 101.675 94.9979V79.1198L91.0557 89.7383V89.7408ZM101.675 36.0608C97.7682 37.1137 94.1741 38.9221 91.0557 41.3204L101.675 51.939V36.0608ZM117.6 95.0005C121.451 93.9611 125.059 92.1748 128.22 89.7434L117.6 79.1249V95.003V95.0005ZM123.229 73.4939L133.849 84.1124C136.281 80.952 138.067 77.344 139.106 73.4939H123.227H123.229Z"
      fill="#0052B4"
    />
    <path
      d="M138.3 61.1306H112.923V35.7536C111.648 35.5872 110.364 35.5035 109.079 35.5031C107.775 35.5031 106.493 35.589 105.236 35.7536V61.1306H79.8579C79.6915 62.4051 79.6079 63.6889 79.6074 64.9742C79.6074 66.2783 79.6934 67.5603 79.8579 68.8177H105.236V94.1948C106.51 94.3612 107.794 94.4449 109.079 94.4453C110.364 94.445 111.648 94.3613 112.923 94.1948V68.8177H138.3C138.633 66.2653 138.633 63.6806 138.3 61.1282V61.1306ZM116.766 72.6637L129.918 85.8152L131.65 83.9241L120.391 72.6661H116.766V72.6637ZM101.392 72.6637L88.2402 85.8152L90.1313 87.5466L101.389 76.2886V72.6637H101.392ZM101.389 57.2871L88.2402 44.1356L86.5087 46.0267L97.7669 57.2871H101.392H101.389ZM116.766 57.2871L129.918 44.1356L128.027 42.4042L116.769 53.6646V57.2871H116.766Z"
      fill="#D80027"
    />
    <defs>
      <filter
        id="filter0_d_118_528"
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
          result="effect1_dropShadow_118_528"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_118_528"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_118_528"
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

export default SynthGBP;
