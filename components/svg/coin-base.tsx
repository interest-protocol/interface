import { FC } from 'react';

import { SVGProps } from './svg.types';

const CoinBase: FC<SVGProps> = ({ maxSize, ...props }) => (
  <svg
    style={{ maxWidth: maxSize, maxHeight: maxSize }}
    viewBox="0 0 462 462"
    fill="none"
    {...props}
  >
    <path
      d="M230.8 0.100098C358.1 0.100098 461.3 103.3 461.3 230.6C461.3 357.9 358.1 461.1 230.8 461.1C103.5 461.1 0.299805 357.9 0.299805 230.6C0.299805 103.3 103.5 0.100098 230.8 0.100098Z"
      fill="#0052FF"
    />
    <path
      d="M230.9 311.6C186.1 311.6 149.9 275.3 149.9 230.6C149.9 185.9 186.2 149.6 230.9 149.6C271 149.6 304.3 178.8 310.7 217.1H392.3C385.4 133.9 315.8 68.5 230.8 68.5C141.3 68.5 68.7002 141.1 68.7002 230.6C68.7002 320.1 141.3 392.7 230.8 392.7C315.8 392.7 385.4 327.3 392.3 244.1H310.6C304.2 282.4 271 311.6 230.9 311.6Z"
      fill="#ffffff"
    />
  </svg>
);

export default CoinBase;
