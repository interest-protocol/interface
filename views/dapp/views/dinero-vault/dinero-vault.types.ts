import { Result } from '@ethersproject/abi';
import { BigNumber } from 'ethers';
import { Dispatch, RefObject, SetStateAction } from 'react';
import { Control, UseFormReturn } from 'react-hook-form';

import { StakeState } from '@/constants';

import { InterestViewEarn } from '../../../../types/ethers-contracts/InterestViewEarnAbi';

export interface DineroVault {
  title: string;
  tip?: string;
  content: string;
}

export interface DineroVaultDetailsFooterItemProps {
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
export interface DineroVaultDetailsTitleProps {
  token1: {
    symbol: string;
    address: `0x${string}`;
  };
  token2: {
    symbol: string;
    address: `0x${string}`;
  };
}

export interface DineroVaultProps {
  vault: `0x${string}`;
  chainId: number;
  account: string;
  stakeDVState: {
    stakeState: StakeState;
    setStakeState: Dispatch<SetStateAction<StakeState>>;
  };
  formVault: UseFormReturn<IVaultForm>;
  loadinDepositState: {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
  };
  loadinWithdrawState: {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
  };
  openDetailsState: {
    openDetails: boolean;
    setOpenDetails: Dispatch<SetStateAction<boolean>>;
  };
  detailRef: RefObject<HTMLDivElement>;
}

export interface DineroVaultFormProps {
  data: VaultData;
  refetch: () => Promise<void>;
  stakeState: StakeState;
  formVault: UseFormReturn<IVaultForm>;
  loadinDepositState: {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
  };
  loadinWithdrawState: {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
  };
}

export interface DineroVaultInfoProps {
  items: ReadonlyArray<DineroVaultDetailsFooterItemProps>;
}
export interface DineroVaultFooterProps {
  dineroVaultDetailsFooterItems: ReadonlyArray<DineroVault>;
  openDetailsState: {
    openDetails: boolean;
    setOpenDetails: Dispatch<SetStateAction<boolean>>;
  };
  detailRef: RefObject<HTMLDivElement>;
}

export interface VaultData {
  vaultAddress: `0x${string}`;
  depositTokenSymbol: string;
  depositTokenAddress: `0x${string}`;
  depositTokenDecimals: number;
  dineroAddress: `0x${string}`;
  dineroDecimals: number;
  maxDineroAmount: BigNumber;
  mintedDineroAmount: BigNumber;
  depositAmount: BigNumber;
  underlyingBalance: BigNumber;
  underlyingAllowance: BigNumber;
  dineroBalance: BigNumber;
  chainId: number;
}

export type TDineroVaultDataKeys =
  | 'maxDineroAmount'
  | 'mintedDineroAmount'
  | 'depositAmount'
  | 'underlyingBalance'
  | 'underlyingAllowance'
  | 'dineroBalance';

export type TDineroVaultData =
  | Result
  | undefined
  | ([InterestViewEarn.UserDineroVaultDataStructOutput] &
      InterestViewEarn.UserDineroVaultDataStructOutput);

export type ProcessDineroVault = (
  chainId: number,
  vaultAddress: `0x${string}`,
  data: TDineroVaultData
) => {
  loading: boolean;
  data: VaultData;
};

export interface ButtonTabSelectProps {
  state: StakeState;
  setState: Dispatch<SetStateAction<StakeState>>;
}

export interface DepositButtonProps {
  data: VaultData;
  refetch: () => Promise<void>;
  control: Control<IVaultForm>;
  loadinDepositState: {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
  };
}

export interface WithdrawButtonProps {
  data: VaultData;
  refetch: () => Promise<void>;
  control: Control<IVaultForm>;
  loadinWithdrawState: {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
  };
}
