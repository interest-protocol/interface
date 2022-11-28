import { FC } from 'react';

import { SVGProps } from './svg.types';

const EthereumNetwork: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
    viewBox="0 0 731.58 731.58"
    {...props}
  >
    <polygon
      id="Path"
      fillOpacity="0.6"
      fill="#fff"
      points="377.18 91.45 377.18 294.23 548.57 370.82 377.18 91.45"
    />
    <polygon
      id="Path-2"
      data-name="Path"
      fill="#fff"
      className="cls-3"
      points="377.18 91.45 205.76 370.82 377.18 294.23 377.18 91.45"
    />
    <polygon
      id="Path-3"
      data-name="Path"
      fill="#fff"
      fillOpacity="0.6"
      points="377.18 502.23 377.18 640.02 548.68 402.74 377.18 502.23"
    />
    <polygon
      id="Path-4"
      data-name="Path"
      fill="#fff"
      className="cls-3"
      points="377.18 640.02 377.18 502.21 205.76 402.74 377.18 640.02"
    />
    <polygon
      id="Path-5"
      data-name="Path"
      fill="#fff"
      fillOpacity="0.2"
      points="377.18 470.34 548.57 370.82 377.18 294.28 377.18 470.34"
    />
    <polygon
      id="Path-6"
      data-name="Path"
      fill="#fff"
      fillOpacity="0.6"
      points="205.76 370.82 377.18 470.34 377.18 294.28 205.76 370.82"
    />
  </svg>
);

export default EthereumNetwork;
