import { Dispatch, SetStateAction } from 'react';

import { ERC20 } from '@/sdk';

export interface VaultTableProps {
  data: ReadonlyArray<VaultData>;
  loading: boolean;
}

export interface VaultCardItemProps {
  title: string;
  content: string;
}

export interface VaultNameProps {
  vault: ReadonlyArray<ERC20>;
  isAuto?: boolean;
  caption: string;
}

export interface VaultRow {
  name: VaultNameProps;
  apy: string;
  earn: string;
  type: string;
  tvl: string;
}

export interface VaultDetails {
  title: string;
  content: string;
}

export interface VaultData {
  id: any;
  vault: ReadonlyArray<ERC20>;
  vaultDetails: ReadonlyArray<VaultDetails>;
  caption: string;
  isAuto?: boolean;
  apy: string;
  earn: string;
  type: 'Investment' | 'Swap';
  tvl: string;
  version: 1 | 2;
}

export interface StateProps {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}
