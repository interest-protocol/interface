import { FC, ReactNode } from 'react';

import { SVGProps } from '../svg/svg.types';

export interface AdviceProps {
  title: string;
  lines: ReadonlyArray<ReactNode>;
  Icon?: FC<SVGProps>;
  buttons?: ReadonlyArray<{
    text: string;
    action: () => void;
  }>;
}

export interface ContentProps {
  supportedChains: ReadonlyArray<number>;
}

export interface WebManagerWrapperProps {
  pathname: string;
  pageTitle: string;
}
