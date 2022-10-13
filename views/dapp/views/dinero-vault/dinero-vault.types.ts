import { Result } from '@ethersproject/abi';
import { BigNumber } from 'ethers';
import { Dispatch, SetStateAction } from 'react';
import { Control } from 'react-hook-form';

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
    address: string;
  };
  token2: {
    symbol: string;
    address: string;
  };
}

export interface DineroVaultProps {
  vault: string;
}

export interface DineroVaultFormProps {
  data: VaultData;
  refetch: () => Promise<void>;
  stakeState: StakeState;
}

export interface DineroVaultInfoProps {
  items: ReadonlyArray<DineroVaultDetailsFooterItemProps>;
}
export interface DineroVaultFooterProps {
  dineroVaultDetailsFooterItems: ReadonlyArray<DineroVault>;
}

export interface VaultData {
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
}

export interface WithdrawButtonProps {
  data: VaultData;
  refetch: () => Promise<void>;
  control: Control<IVaultForm>;
}
