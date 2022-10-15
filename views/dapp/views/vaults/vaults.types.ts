import { Result } from '@ethersproject/abi';
import { BigNumber } from 'ethers';
import { Dispatch, SetStateAction } from 'react';
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { VaultTypes } from '@/constants';

import { InterestViewEarn } from '../../../../types/ethers-contracts/InterestViewEarnAbi';

export interface VaultTableProps {
  data: ReadonlyArray<VaultData>;
  loading: boolean;
  control: Control<IVaultForm>;
}
export interface VaultHeaderProps {
  size: number;
}

export interface VaultData {
  vaultAddress: string;
  depositTokenSymbol: string;
  depositTokenAddress: string;
  depositAmount: BigNumber;
  depositTokenDecimals: number;
  apr: null | BigNumber;
  earn: null | BigNumber; // To be decided
  type: VaultTypes;
  tvl: BigNumber;
}

export interface StateProps {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}

export interface IVaultForm {
  search: string;
  type: VaultTypes;
  onlyDeposit: boolean;
}

export interface VaultFilterTableProps extends VaultFilterManagerProps {
  register: UseFormRegister<IVaultForm>;
}

export interface VaultFilterManagerProps {
  control: Control<IVaultForm>;
  setValue: UseFormSetValue<IVaultForm>;
  getValues: UseFormGetValues<IVaultForm>;
}

export type ProcessVaultsSummaryData = (
  chainId: number,
  data:
    | Result
    | undefined
    | ([InterestViewEarn.DineroVaultSummaryStructOutput[]] & {
        dineroVaults: InterestViewEarn.DineroVaultSummaryStructOutput[];
      })
) => { loading: boolean; data: ReadonlyArray<VaultData> };
