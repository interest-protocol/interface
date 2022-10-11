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

export interface DineroVaultTableProps {
  data: ReadonlyArray<DineroVaultData>;
  loading: boolean;
  control: Control<IVaultForm>;
}
export interface DineroVaultHeaderProps {
  size: number;
}

export interface DineroVaultData {
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

export interface DineroVaultFilterTableProps
  extends DineroVaultFilterManagerProps {
  register: UseFormRegister<IVaultForm>;
}

export interface DineroVaultFilterManagerProps {
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
) => { loading: boolean; data: ReadonlyArray<DineroVaultData> };
