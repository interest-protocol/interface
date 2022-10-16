import { BigNumber } from 'ethers';
import { ReactNode } from 'react';
import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface TokenData {
  symbol: string;
  Icon: ReactNode;
  decimals: number;
  address: string;
}

export interface RemoveLiquidityCardProps {
  isStable: boolean;
  tokens: TokenData[];
  lpBalance: BigNumber;
  lpAllowance: BigNumber;
  pairAddress: string;
  isFetchingInitialData: boolean;
  chainId: number;
  refetch: () => Promise<void>;
  account: string;
}

export interface RemoveLiquidityCardContentProps {
  isStable: boolean;
  tokens: TokenData[];
  lpBalance: BigNumber;
  lpAllowance: BigNumber;
  pairAddress: string;
  isFetchingInitialData: boolean;
  chainId: number;
  refetch: () => Promise<void>;
  account: string;
  control: Control<IRemoveLiquidityForm>;
  setValue: UseFormSetValue<IRemoveLiquidityForm>;
}

export interface IRemoveLiquidityForm {
  loading: boolean;
  removeLoading: boolean;
  lpAmount: string;
  token0Amount: string;
  token1Amount: string;
}

export interface InputBalanceProps {
  balance: number;
  disabled?: boolean;
  currencyPrefix: ReactNode;
  name: keyof IRemoveLiquidityForm;
  register: UseFormRegister<IRemoveLiquidityForm>;
  setValue: UseFormSetValue<IRemoveLiquidityForm>;
  control: Control<IRemoveLiquidityForm>;
}

export interface LinearLoaderProps {
  control: Control<IRemoveLiquidityForm>;
}

export interface ApproveButtonProps {
  onClick: () => Promise<undefined | void>;
  control: Control<IRemoveLiquidityForm>;
  symbol0: string;
  symbol1: string;
  disabled: boolean;
}

export interface RemoveLiquidityButtonProps {
  onClick: () => Promise<undefined | void>;
  control: Control<IRemoveLiquidityForm>;
  disabled: boolean;
}

export interface TokenAmountProps {
  Icon: TokenData['Icon'];
  control: Control<IRemoveLiquidityForm>;
  symbol: string;
  name: Exclude<keyof IRemoveLiquidityForm, 'lpAmount'>;
  isFetchingInitialData: boolean;
}

export interface RemoveLiquidityManagerProps {
  setValue: UseFormSetValue<IRemoveLiquidityForm>;
  control: Control<IRemoveLiquidityForm>;
  isStable: boolean;
  token0Address: string;
  token1Address: string;
  token0Decimals: number;
  token1Decimals: number;
  chainId: number;
}

export interface UseRemoveLiquidityArgs {
  tokens: TokenData[];
  control: Control<IRemoveLiquidityForm>;
  lpBalance: BigNumber;
  chainId: number;
  account: string;
  isStable: boolean;
}
