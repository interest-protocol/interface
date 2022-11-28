import { FC } from 'react';

import { SVGProps } from './svg.types';

const Progress: FC<
  SVGProps & {
    progress: number;
    custom?: boolean;
  }
> = ({ progress, custom, maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
    {...(!custom && { viewBox: '0 0 330 10' })}
    fill="none"
    {...props}
  >
    <rect
      width={custom ? props.width : '330'}
      height="10"
      rx="5"
      fill="#33373B"
    />
    <rect
      width={
        custom
          ? `${progress}%`
          : (330 * (progress > 100 ? 100 : progress)) / 100
      }
      height="10"
      rx="5"
      fill="currentColor"
    />
  </svg>
);

export default Progress;
