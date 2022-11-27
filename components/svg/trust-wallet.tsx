import { FC } from 'react';

import { SVGProps } from './svg.types';

const TrustWallet: FC<SVGProps> = ({ maxSize, ...props }) => (
  <svg
    style={{ maxWidth: maxSize, maxHeight: maxSize }}
    viewBox="0 0 113 113"
    fill="none"
    {...props}
  >
    <path
      d="M3.84 19.21C0 26.74 0 36.59 0 56.29C0 75.99 0 85.85 3.84 93.38C7.21525 99.9953 12.5947 105.375 19.21 108.75C26.74 112.59 36.59 112.59 56.29 112.59C75.99 112.59 85.85 112.59 93.38 108.75C99.9953 105.375 105.375 99.9953 108.75 93.38C112.59 85.85 112.59 76 112.59 56.29C112.59 36.58 112.59 26.74 108.75 19.21C105.375 12.5947 99.9953 7.21525 93.38 3.84C85.85 0 76 0 56.29 0C36.58 0 26.74 0 19.21 3.84C12.5947 7.21525 7.21525 12.5947 3.84 19.21ZM84.39 30.36C84.8746 30.3639 85.3536 30.4633 85.7998 30.6523C86.246 30.8414 86.6506 31.1165 86.9905 31.462C87.3303 31.8074 87.5988 32.2164 87.7806 32.6656C87.9624 33.1148 88.054 33.5954 88.05 34.08C87.87 44.56 87.47 52.58 86.71 58.93C85.95 65.28 84.86 70 83.19 73.82C82.1613 76.1878 80.7452 78.3676 79 80.27C76.8193 82.5316 74.3195 84.4621 71.58 86C70.41 86.7 69.19 87.39 67.91 88.12C65.18 89.67 62.18 91.37 58.78 93.65C58.1788 94.0554 57.4701 94.272 56.745 94.272C56.0199 94.272 55.3112 94.0554 54.71 93.65C51.26 91.35 48.22 89.65 45.46 88.06L43.66 87.06C40.505 85.3883 37.5917 83.2959 35 80.84C33.2168 79.0372 31.7586 76.9396 30.69 74.64C28.9351 70.7168 27.7724 66.5547 27.24 62.29C26.19 55.45 25.66 46.5 25.46 34.08C25.4507 33.594 25.5385 33.111 25.7184 32.6594C25.8983 32.2078 26.1666 31.7966 26.5075 31.4501C26.8484 31.1036 27.2551 30.8287 27.7038 30.6415C28.1524 30.4543 28.6339 30.3586 29.12 30.36H30.64C35.3 30.36 45.64 29.92 54.49 22.99C55.1363 22.4911 55.9302 22.2213 56.7467 22.2232C57.5632 22.225 58.3559 22.4983 59 23C67.9 29.93 78.19 30.39 82.87 30.37L84.39 30.36ZM76.21 71.48C77.6362 68.2042 78.5761 64.7376 79 61.19C80.0297 53.3845 80.5774 45.5229 80.64 37.65C72.1435 37.5327 63.8537 35.0122 56.73 30.38C49.6069 34.9977 41.3279 37.5171 32.84 37.65C33.04 46.2 33.42 52.85 34.04 58.07C34.74 64.02 35.75 68.07 36.99 70.88C37.68 72.5063 38.6402 74.0041 39.83 75.31C41.544 77.0648 43.5046 78.5606 45.65 79.75C46.65 80.37 47.84 81.02 49.1 81.75C51.33 83.01 53.88 84.46 56.73 86.27C59.53 84.49 62.05 83.06 64.25 81.81L66.16 80.72C68.732 79.3709 71.1158 77.6899 73.25 75.72C74.4597 74.4806 75.4534 73.0475 76.19 71.48"
      fill="#3375BB"
    />
  </svg>
);

export default TrustWallet;
