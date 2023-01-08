import { Dispatch, SetStateAction } from 'react';
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { SwapSelectCurrencyProps } from '../dex/dex.types';

interface FormValue {
  type: string;
  decimals: number;
  symbol: string;
  value: string;
}

export interface DexFindPoolForm {
  tokenA: FormValue;
  tokenB: FormValue;
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
  tokenBalances: [number, number];
  getValues: UseFormGetValues<DexFindPoolForm>;
}

export interface CreatePoolFieldProps {
  needAllowance: boolean;
  name: 'tokenA' | 'tokenB';
  register: UseFormRegister<DexFindPoolForm>;
  setValue: UseFormSetValue<DexFindPoolForm>;
  tokenBalance: number;
  getValues: UseFormGetValues<DexFindPoolForm>;
}

export interface PriceProps {
  control: Control<DexFindPoolForm>;
}

export interface UseAddNativeTokenLiquidityArgs {
  control: Control<DexFindPoolForm>;
  nativeBalance: number;
  isStable: boolean;
  account: string;
  chainId: number;
}

export interface FindPoolButtonProps {
  control?: Control<DexFindPoolForm>;
  getValues: UseFormGetValues<DexFindPoolForm>;
  tokenAType: string;
  tokenBType: string;
  isCreatingPair: boolean;
  setCreatingPair: Dispatch<SetStateAction<boolean>>;
}
