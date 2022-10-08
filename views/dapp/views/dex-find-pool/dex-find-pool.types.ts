import { BigNumber } from 'ethers';
import { Dispatch, SetStateAction } from 'react';
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { BalanceData } from '@/hooks';

import { SwapSelectCurrencyProps } from '../dex/dex.types';

interface FormValue {
  address: string;
  decimals: number;
  symbol: string;
  value: string;
}

export interface DexFindPoolForm {
  tokenA: FormValue;
  tokenB: FormValue;
  isStable: boolean;
}

export interface FindPoolProps {
  control: Control<DexFindPoolForm>;
  setValue: UseFormSetValue<DexFindPoolForm>;
  currencyASelectArgs: Omit<SwapSelectCurrencyProps, 'currentToken'>;
  currencyBSelectArgs: Omit<SwapSelectCurrencyProps, 'currentToken'>;
  setCreatingPair: Dispatch<SetStateAction<boolean>>;
}

export interface CreatePoolProps {
  needAllowance: [boolean, boolean];
  control: Control<DexFindPoolForm>;
  register: UseFormRegister<DexFindPoolForm>;
  setValue: UseFormSetValue<DexFindPoolForm>;
  tokenBalances: [BigNumber, BigNumber];
  getValues: UseFormGetValues<DexFindPoolForm>;
  refetch: () => Promise<void>;
}

export interface CreatePoolFieldProps {
  needAllowance: boolean;
  name: 'tokenA' | 'tokenB';
  register: UseFormRegister<DexFindPoolForm>;
  setValue: UseFormSetValue<DexFindPoolForm>;
  tokenBalance: BigNumber;
  getValues: UseFormGetValues<DexFindPoolForm>;
  refetch: () => Promise<void>;
}

export interface PriceProps {
  control: Control<DexFindPoolForm>;
}

export interface UseAddNativeTokenLiquidityArgs {
  control: Control<DexFindPoolForm>;
  balancesData: Record<string, BalanceData>;
  nativeBalance: BigNumber;
  isStable: boolean;
  account: string;
  chainId: number;
}

export interface FindPoolButtonProps {
  chainId: number;
  account: string;
  balancesData: Record<string, BalanceData>;
  control: Control<DexFindPoolForm>;
  getValues: UseFormGetValues<DexFindPoolForm>;
  nativeBalance: BigNumber;
  tokenAAddress: string;
  tokenBAddress: string;
  isStable: boolean;
  isCreatingPair: boolean;
  setCreatingPair: Dispatch<SetStateAction<boolean>>;
}
