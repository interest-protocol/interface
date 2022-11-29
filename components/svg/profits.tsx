import { FC } from 'react';

import { SVGProps } from './svg.types';

const Profits: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
    viewBox="0 0 100 100"
    fill="none"
    {...props}
  >
    <circle cx="50" cy="50" r="50" fill="#0055FF" />
    <g filter="url(#filter0_d_549_3129)">
      <path
        d="M22 50C22 48.3431 23.3431 47 25 47H29C30.6569 47 32 48.3431 32 50V77H22V50Z"
        fill="white"
      />
    </g>
    <g filter="url(#filter1_d_549_3129)">
      <path
        d="M37 43C37 41.3431 38.3431 40 40 40H44C45.6569 40 47 41.3431 47 43V77H37V43Z"
        fill="white"
      />
    </g>
    <g filter="url(#filter2_d_549_3129)">
      <path
        d="M52 35C52 33.3431 53.3431 32 55 32H59C60.6569 32 62 33.3431 62 35V77H52V35Z"
        fill="white"
      />
    </g>
    <g filter="url(#filter3_d_549_3129)">
      <path
        d="M67 26C67 24.3431 68.3431 23 70 23H74C75.6569 23 77 24.3431 77 26V77H67V26Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_549_3129"
        x="18"
        y="45"
        width="18"
        height="38"
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
          result="effect1_dropShadow_549_3129"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_549_3129"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_d_549_3129"
        x="33"
        y="38"
        width="18"
        height="45"
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
          result="effect1_dropShadow_549_3129"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_549_3129"
          result="shape"
        />
      </filter>
      <filter
        id="filter2_d_549_3129"
        x="48"
        y="30"
        width="18"
        height="53"
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
          result="effect1_dropShadow_549_3129"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_549_3129"
          result="shape"
        />
      </filter>
      <filter
        id="filter3_d_549_3129"
        x="63"
        y="21"
        width="18"
        height="62"
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
          result="effect1_dropShadow_549_3129"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_549_3129"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default Profits;
