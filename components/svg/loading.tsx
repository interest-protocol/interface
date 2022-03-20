import { FC, SVGAttributes } from 'react';

import { Rotate } from '@/elements';

const Loading: FC<SVGAttributes<SVGSVGElement>> = (props) => (
  <Rotate display="flex">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  </Rotate>
);

export default Loading;
