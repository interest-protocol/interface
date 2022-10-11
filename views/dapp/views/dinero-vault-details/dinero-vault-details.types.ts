import { Result } from '@ethersproject/abi';
import { BigNumber } from 'ethers';
import { Dispatch, SetStateAction } from 'react';
import { Control } from 'react-hook-form';

import { StakeState } from '@/constants';

import { InterestViewEarn } from '../../../../types/ethers-contracts/InterestViewEarnAbi';

export interface DineroVaultDetails {
  title: string;
  tip?: string;
  content: string;
  isLoading: boolean;
}

export interface DineroVaultDetailsFooterItemProps {
  title: string;
  content: string;
  tip?: string;
  fontSize?: string;
  color?: string;
  version?: ReadonlyArray<string>;
  isLoading: boolean;
}

export interface IVaultForm {
  value: string;
}
export interface DineroVaultDetailsTitleProps {
  token1: {
    symbol: string;
    address: string;
  };
  token2: {
    symbol: string;
    address: string;
  };
  isLoading: boolean;
}

export interface DineroVaultDetailsDetailsProps {
  vault: string;
}

export interface DineroVaultFormProps {
  data: DineroVaultData;
  refetch: () => Promise<void>;
  stakeState: StakeState;
  isLoading: boolean;
}

export interface DineroVaultDetailsInfoProps {
  items: ReadonlyArray<DineroVaultDetailsFooterItemProps>;
}
export interface DineroVaultDetailsFooterProps {
  dineroVaultDetailsFooterItems: ReadonlyArray<DineroVaultDetails>;
}

export interface DineroVaultData {
  vaultAddress: string;
  depositTokenSymbol: string;
  depositTokenAddress: string;
  depositTokenDecimals: number;
  dineroAddress: string;
  dineroDecimals: number;
  maxDineroAmount: BigNumber;
  mintedDineroAmount: BigNumber;
  depositAmount: BigNumber;
  underlyingBalance: BigNumber;
  underlyingAllowance: BigNumber;
  dineroBalance: BigNumber;
  chainId: number;
}

export type ProcessDineroVault = (
  chainId: number,
  vaultAddress: string,
  data:
    | Result
    | undefined
    | ([InterestViewEarn.UserDineroVaultDataStructOutput] &
        InterestViewEarn.UserDineroVaultDataStructOutput)
) => {
  loading: boolean;
  data: DineroVaultData;
};

export interface ButtonTabSelectProps {
  state: StakeState;
  setState: Dispatch<SetStateAction<StakeState>>;
}

export interface DepositButtonProps {
  data: DineroVaultData;
  refetch: () => Promise<void>;
  control: Control<IVaultForm>;
}

export interface WithdrawButtonProps {
  data: DineroVaultData;
  refetch: () => Promise<void>;
  control: Control<IVaultForm>;
}
