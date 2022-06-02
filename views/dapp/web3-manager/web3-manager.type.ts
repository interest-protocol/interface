import { FC, ReactNode, SVGAttributes } from 'react';

export interface AdviceProps {
  title: string;
  lines: ReadonlyArray<ReactNode>;
  Icon?: FC<SVGAttributes<SVGSVGElement>>;
  buttons?: ReadonlyArray<{
    text: string;
    action: Promise<() => void>;
  }>;
}

export interface Web3ManagerProps {
  supportedChains: ReadonlyArray<number>;
}
