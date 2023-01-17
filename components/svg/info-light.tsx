import { FC } from 'react';

import { SVGProps } from './svg.types';

const InfoLight: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
    viewBox="0 0 31 31"
    fill="none"
    {...props}
  >
    <circle cx="15.5" cy="15.5" r="15" stroke="currentColor" />
    <path
      d="M14.168 28V11.2H16.44V28H14.168ZM15.32 7.488C14.8507 7.488 14.456 7.328 14.136 7.008C13.816 6.688 13.656 6.304 13.656 5.856C13.656 5.408 13.816 5.03466 14.136 4.736C14.456 4.416 14.8507 4.256 15.32 4.256C15.7893 4.256 16.184 4.40533 16.504 4.704C16.824 5.00267 16.984 5.376 16.984 5.824C16.984 6.29333 16.824 6.688 16.504 7.008C16.2053 7.328 15.8107 7.488 15.32 7.488Z"
      fill="currentColor"
    />
  </svg>
);

export default InfoLight;
