import { BigNumber } from 'ethers';

import { VaultDetails } from '../vault/vault.types';

export interface VaultDetailsItemProps {
  title: string;
  content: string;
  tip?: string;
  fontSize?: string;
  color?: string;
  version?: ReadonlyArray<string>;
}

export interface IVaultForm {
  value: string;
}

export interface VaultDetailsProps {
  vault: string;
}

export interface VaultDetailBalanceProps {
  symbol: string;
  address: string;
  balance: BigNumber;
}

export interface VaultDetailsInfoProps {
  items: ReadonlyArray<VaultDetailsItemProps>;
}
export interface VaultDetailsPoolProps {
  VaultPoolDetails: ReadonlyArray<VaultDetails>;
}
