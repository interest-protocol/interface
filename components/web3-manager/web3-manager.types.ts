import { GetObjectDataResponse } from '@mysten/sui.js';
import { SuiObject } from '@mysten/sui.js/src/types/objects';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';
import { KeyedMutator } from 'swr';

export interface Web3ManagerSuiObject {
  type: string;
  name: string;
  totalBalance: BigNumber;
  objects: ReadonlyArray<SuiObject>;
  decimals: number;
}

export interface Web3ManagerState {
  account: null | string;
  coins: ReadonlyArray<Web3ManagerSuiObject>;
  coinsMap: Record<string, Web3ManagerSuiObject>;
  connected: boolean;
  error: boolean;
  mutate: KeyedMutator<never[] | GetObjectDataResponse[]>;
}

export interface Web3ManagerProps {
  children: ReactNode;
}
