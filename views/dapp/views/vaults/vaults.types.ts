import { Result } from '@ethersproject/abi';
import { BigNumber } from 'ethers';
import { Dispatch, SetStateAction } from 'react';
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormReturn,
  UseFormSetValue,
} from 'react-hook-form';

import { VaultTypes } from '@/constants';

import { InterestViewEarn } from '../../../../types/ethers-contracts/InterestViewEarnAbi';

export interface VaultTableProps {
  data: ReadonlyArray<VaultData>;
  loading: boolean;
  control: Control<IVaultForm>;
  isDesktop: boolean;
}
export interface VaultHeaderProps {
  size: number;
}

export interface VaultData {
  vaultAddress: `0x${string}`;
  depositTokenSymbol: string;
  depositTokenAddress: `0x${string}`;
  depositAmount: BigNumber;
  depositTokenDecimals: number;
  apr: null | BigNumber;
  earn: null | BigNumber; // To be decided
  type: VaultTypes;
  tvl: BigNumber;
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

export interface VaultProps {
  formVault: UseFormReturn<IVaultForm>;
  desktopState: {
    isDesktop: boolean;
    setDesktop: Dispatch<SetStateAction<boolean>>;
  };
}
