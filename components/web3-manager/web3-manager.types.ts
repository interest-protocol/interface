import { SuiObject } from '@mysten/sui.js/src/types/objects';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';

export interface Web3ManagerSuiObject {
  type: string;
  name: string;
  totalBalance: BigNumber;
  objects: ReadonlyArray<SuiObject>;
}

export interface Web3ManagerState {
  account: null | string;
  coins: ReadonlyArray<Web3ManagerSuiObject>;
  coinsMap: Record<string, Web3ManagerSuiObject>;
  connected: boolean;
  error: boolean;
}

export interface Web3ManagerProps {
  children: ReactNode;
}
