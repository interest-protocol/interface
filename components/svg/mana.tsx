import { FC, SVGAttributes } from 'react';
import { v4 } from 'uuid';

const id = v4();

const Mana: FC<SVGAttributes<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 400 400" fill="none" {...props}>
    <path
      d="M200 400C310.457 400 400 310.457 400 200C400 89.5431 310.457 0 200 0C89.5431 0 0 89.5431 0 200C0 310.457 89.5431 400 200 400Z"
      fill={`url(#${id}-0)`}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M141.7 130V280H266.7L141.7 130Z"
      fill={`url(#${id}-1)`}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.7002 280H141.7V130L16.7002 280Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M40 320C51.4 335.1 64.9 348.6 80 360H320C335.1 348.6 348.6 335.1 360 320H40Z"
      fill="#FC9965"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M80 360C113.4 385.1 155 400 200 400C245 400 286.6 385.1 320 360H80Z"
      fill="#FF2D55"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M268.3 210V320H360L268.3 210Z"
      fill={`url(#${id}-2)`}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M268.3 280H16.7002C22.9002 294.3 30.8002 307.7 40.0002 320H268.4V280H268.3Z"
      fill="#FFBC5B"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M176.7 320H268.3V210L176.7 320Z"
      fill="white"
    />
    <path
      d="M268.3 180C295.914 180 318.3 157.614 318.3 130C318.3 102.386 295.914 80 268.3 80C240.686 80 218.3 102.386 218.3 130C218.3 157.614 240.686 180 268.3 180Z"
      fill="#FFC95B"
    />
    <path
      d="M141.7 100C155.507 100 166.7 88.8071 166.7 75C166.7 61.1929 155.507 50 141.7 50C127.893 50 116.7 61.1929 116.7 75C116.7 88.8071 127.893 100 141.7 100Z"
      fill="#FFC95B"
    />
    <defs>
      <linearGradient
        id={`${id}-0`}
        x1="341.44"
        y1="58.56"
        x2="58.56"
        y2="341.44"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF2D55" />
        <stop offset="1" stopColor="#FFBC5B" />
      </linearGradient>
      <linearGradient
        id={`${id}-1`}
        x1="204.203"
        y1="130.005"
        x2="204.203"
        y2="280.005"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#A524B3" />
        <stop offset="1" stopColor="#FF2D55" />
      </linearGradient>
      <linearGradient
        id={`${id}-2`}
        x1="314.144"
        y1="210.007"
        x2="314.144"
        y2="320.007"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#A524B3" />
        <stop offset="1" stopColor="#FF2D55" />
      </linearGradient>
    </defs>
  </svg>
);

export default Mana;
