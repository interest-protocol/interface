import { SendTransactionResult } from '@wagmi/core';
import { BigNumber } from 'ethers';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Control, UseFormSetValue } from 'react-hook-form';

export interface IAddLiquidityForm {
  token0Amount: string;
  token1Amount: string;
  error: string;
  locked: boolean;
}

export interface IToken {
  symbol: string;
  Icon: ReactNode;
  decimals: number;
  balance: BigNumber;
  allowance: BigNumber;
  address: string;
}

export interface AddLiquidityCardProps {
  isStable: boolean;
  tokens: IToken[];
  fetchingInitialData: boolean;
  refetch: () => Promise<void>;
}

export interface AddLiquidityCardContentProps {
  isStable: AddLiquidityCardProps['isStable'];
  tokens: AddLiquidityCardProps['tokens'];
  fetchingInitialData: AddLiquidityCardProps['fetchingInitialData'];
  refetch: AddLiquidityCardProps['refetch'];
  isFetchingQuote: boolean;
  control: Control<IAddLiquidityForm>;
  setValue: UseFormSetValue<IAddLiquidityForm>;
  chainId?: number;
  account?: string;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export interface AddLiquidityManagerProps {
  chainId?: number;
  isFetchingQuote: boolean;
  setIsFetchingQuote: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<IAddLiquidityForm>;
  control?: Control<IAddLiquidityForm>;
  tokens: AddLiquidityCardProps['tokens'];
  isStable: boolean;
}

export interface BalanceErrorProps {
  control: Control<IAddLiquidityForm>;
  balance: BigNumber;
  name: Exclude<keyof IAddLiquidityForm, 'error' | 'locked'>;
  decimals: number;
  symbol: string;
}

export interface UseAddLiquidityArgs {
  tokens: IToken[];
  control?: Control<IAddLiquidityForm>;
  isStable: boolean;
}

export interface ErrorLiquidityMessageProps {
  control: Control<IAddLiquidityForm>;
}

export interface AddLiquidityCardButtonProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  refetch: () => Promise<void>;
  addLiquidity?: () => Promise<SendTransactionResult | undefined>;
}

export const INPUT_NAMES = ['token0Amount', 'token1Amount'] as Array<
  Exclude<keyof IAddLiquidityForm, 'error' | 'locked'>
>;
