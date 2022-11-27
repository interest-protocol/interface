import { FC } from 'react';

import { SVGProps } from './svg.types';

const EN: FC<SVGProps> = ({ maxSize, ...props }) => (
  <svg
    id="flag-icons-us"
    style={{ maxWidth: maxSize, maxHeight: maxSize, borderRadius: '50%' }}
    viewBox="0 0 512 512"
    {...props}
  >
    <path
      fill="#eee"
      d="M256 0h256v64l-32 32 32 32v64l-32 32 32 32v64l-32 32 32 32v64l-256 32L0 448v-64l32-32-32-32v-64z"
    />
    <path
      fill="#d80027"
      d="M224 64h288v64H224Zm0 128h288v64H256ZM0 320h512v64H0Zm0 128h512v64H0Z"
    />
    <path fill="#0052b4" d="M0 0h256v256H0Z" />
    <path
      fill="#eee"
      d="m187 243 57-41h-70l57 41-22-67zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67zm162-81 57-41h-70l57 41-22-67zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67Zm162-82 57-41h-70l57 41-22-67Zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67Z"
    />
  </svg>
);

export default EN;
