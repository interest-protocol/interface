import { FC } from 'react';
import { v4 } from 'uuid';

import { SVGProps } from './svg.types';

const OperaWallet: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => {
  const id = v4();

  return (
    <svg
      style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
      viewBox="0 0 256 256"
      fill="none"
      {...props}
    >
      <g clipPath={`url(#${id}-clip-path)`}>
        <path
          d="M85.9 200.1C71.7 183.4 62.6 158.7 62 131V125C62.6 97.3 71.8 72.6 85.9 55.9C104.3 32.1 131.3 21.4 161.8 21.4C180.6 21.4 198.3 22.7 213.3 32.7C190.8 12.4 161.1 0.1 128.5 0H128C57.3 0 0 57.3 0 128C0 196.6 54 252.7 121.9 255.9C123.9 256 126 256 128 256C160.8 256 190.7 243.7 213.3 223.4C198.3 233.4 181.6 233.8 162.8 233.8C132.4 233.9 104.2 224 85.9 200.1Z"
          fill={`url(#${id}-linear-gradient-1)`}
        />
        <path
          d="M85.8999 55.8999C97.5999 41.9999 112.8 33.6999 129.4 33.6999C166.7 33.6999 196.9 75.8999 196.9 128.1C196.9 180.3 166.7 222.5 129.4 222.5C112.8 222.5 97.6999 214.1 85.8999 200.3C104.3 224.1 131.6 239.3 162 239.3C180.7 239.3 198.3 233.6 213.3 223.6C239.5 200 256 165.9 256 128C256 90.0999 239.5 55.9999 213.3 32.5999C198.3 22.5999 180.8 16.8999 162 16.8999C131.5 16.8999 104.2 31.9999 85.8999 55.8999Z"
          fill={`url(#${id}-linear-gradient-2)`}
        />
      </g>
      <defs>
        <linearGradient
          id={`${id}-linear-gradient-1`}
          x1="106.656"
          y1="4.1738"
          x2="106.656"
          y2="252.275"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.3" stopColor="#FF1B2D" />
          <stop offset="0.4381" stopColor="#FA1A2C" />
          <stop offset="0.5939" stopColor="#ED1528" />
          <stop offset="0.7581" stopColor="#D60E21" />
          <stop offset="0.9272" stopColor="#B70519" />
          <stop offset="1" stopColor="#A70014" />
        </linearGradient>
        <linearGradient
          id={`${id}-linear-gradient-2`}
          x1="170.933"
          y1="18.7969"
          x2="170.933"
          y2="238.23"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9C0000" />
          <stop offset="0.7" stopColor="#FF4B4B" />
        </linearGradient>
        <clipPath id={`${id}-clip-path`}>
          <rect width="256" height="256" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default OperaWallet;
