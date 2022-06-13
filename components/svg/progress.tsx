import { FC, SVGAttributes } from 'react';

const Progress: FC<
  SVGAttributes<SVGSVGElement> & { progress: number; custom?: boolean }
> = ({ progress, custom, ...props }) => (
  <svg {...(!custom && { viewBox: '0 0 330 10' })} fill="none" {...props}>
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
