import { FC } from 'react';

import { SVGProps } from './svg.types';

const PT: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    id="flag-icons-pt"
    {...props}
    style={{ maxWidth: maxWidth, maxHeight: maxHeight, borderRadius: '50%' }}
    viewBox="0 0 512 512"
  >
    <path fill="#6da544" d="M0 512h167l37.9-260.3L167 0H0z" />
    <path fill="#d80027" d="M512 0H167v512h345z" />
    <circle cx="167" cy="256" r="89" fill="#ffda44" />
    <path fill="#d80027" d="M116.9 211.5V267a50 50 0 1 0 100.1 0v-55.6H117z" />
    <path
      fill="#eee"
      d="M167 283.8c-9.2 0-16.7-7.5-16.7-16.7V245h33.4v22c0 9.2-7.5 16.7-16.7 16.7z"
    />
  </svg>
);

export default PT;
