import { VaultDetails } from '../vault/vault.types';

export interface VaultFarmDetailsItemProps {
  title: string;
  content: string;
  tip?: string;
  fontSize?: string;
  color?: string;
  version?: ReadonlyArray<string>;
}

export interface IVaultFarmForm {
  value: string;
}

export interface VaultFarmProps {
  farm: string;
}

export interface VaultDetailBalanceProps {
  symbol: string;
  balance: string;
}

export interface VaultFarmDetailsProps {
  items: ReadonlyArray<VaultFarmDetailsItemProps>;
}
export interface VaultFarmPoolProps {
  VaultPoolDetails: ReadonlyArray<VaultDetails>;
}
