import { FC, ReactNode, SVGAttributes } from 'react';

export interface AdviceProps {
  title: string;
  lines: ReadonlyArray<ReactNode>;
  Icon?: FC<SVGAttributes<SVGSVGElement>>;
  buttons?: ReadonlyArray<{
    text: string;
    action: () => void;
  }>;
}

export interface Web3ManagerProps {
  supportedChains: ReadonlyArray<number>;
  pathname: string;
  prevPathName: string | undefined;
}

export interface ContentProps {
  error: Error | undefined;
  triedEagerly: boolean;
  isActivating: boolean;
  chainId: number | undefined;
  triedSwitchToRightNetwork: boolean;
  supportedChains: ReadonlyArray<number>;
  handleSwitchToNetwork: (x: number) => () => Promise<void | null>;
  reduxChainId: number | null;
}

export interface Web3ManagerWrapperProps {
  pathname: string;
}
