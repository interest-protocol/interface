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

export interface Web3ManagerProps {
  supportedChains: ReadonlyArray<number>;
  pageTitle: string;
}

export interface ContentProps {
  supportedChains: ReadonlyArray<number>;
}

export interface Web3ManagerWrapperProps {
  pathname: string;
  pageTitle: string;
}
