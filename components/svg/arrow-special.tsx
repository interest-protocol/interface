import { FC } from 'react';

import { SVGProps } from './svg.types';

const ArrowSpecial: FC<SVGProps> = ({ maxSize, ...props }) => (
  <svg
    style={{ maxWidth: maxSize, maxHeight: maxSize }}
    viewBox="0 0 12 7"
    {...props}
  >
    <path
      d="M1.51465 1.48535L6 5.9707L10.4854 1.48535"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowSpecial;
