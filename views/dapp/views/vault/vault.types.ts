import { Dispatch, SetStateAction } from 'react';
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { ERC20 } from '@/sdk';

export interface VaultTableProps {
  data: ReadonlyArray<VaultData>;
  loading: boolean;
  control: Control<IVaultForm>;
}

export interface VaultCardItemProps {
  title: string;
  content: string;
}

export interface VaultNameProps {
  vault: ReadonlyArray<ERC20>;
  caption?: string;
}
export interface VaultDetailsProps {
  vaults: [VaultNameProps, VaultNameProps];
}
export interface VaultRow {
  name: VaultNameProps;
  apr: string;
  earn: string;
  type: string;
  tvl: string;
}

export interface VaultDetails {
  title: string;
  tip?: string;
  content: string;
}

export interface VaultData {
  id: any;
  vault: ReadonlyArray<ERC20>;
  vaultDetails: ReadonlyArray<VaultDetails>;
  caption: string;
  apr: string;
  earn: string;
  type: 'LP';
  tvl: string;
  version: 1 | 2;
}

export interface StateProps {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}

export interface IVaultForm {
  search: string;
  type: boolean;
}

export interface VaultFiltersProps extends VaultFilterManagerProps {
  register: UseFormRegister<IVaultForm>;
}

export interface VaultFilterManagerProps {
  control: Control<IVaultForm>;
  setValue: UseFormSetValue<IVaultForm>;
  getValues: UseFormGetValues<IVaultForm>;
}
