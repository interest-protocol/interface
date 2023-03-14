import { Dispatch, SetStateAction } from 'react';
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormReturn,
  UseFormSetValue,
} from 'react-hook-form';

import {
  OnSelectCurrency,
  SearchFieldForm,
} from './../components/select-currency/select-currency.types';

interface FormValue {
  type: string;
  name: string;
  value: string;
  symbol: string;
  decimals: number;
}

export interface DexFindPoolForm {
  tokenA: FormValue;
  tokenB: FormValue;
  isStable: boolean;
}

export interface FindPoolProps {
  control: Control<DexFindPoolForm>;
  formSearch?: UseFormReturn<SearchFieldForm>;
  setValue: UseFormSetValue<DexFindPoolForm>;
  getValues: UseFormGetValues<DexFindPoolForm>;
  setCreatingPair: Dispatch<SetStateAction<boolean>>;
  onSelectCurrency: (name: 'tokenA' | 'tokenB') => OnSelectCurrency;
}

export interface CreatePoolProps {
  control: Control<DexFindPoolForm>;
  register: UseFormRegister<DexFindPoolForm>;
  setValue: UseFormSetValue<DexFindPoolForm>;
  getValues: UseFormGetValues<DexFindPoolForm>;
  refetch: () => Promise<void>;
}

export interface CreatePoolFieldProps {
  name: 'tokenA' | 'tokenB';
  register: UseFormRegister<DexFindPoolForm>;
  setValue: UseFormSetValue<DexFindPoolForm>;
  getValues: UseFormGetValues<DexFindPoolForm>;
  refetch: () => Promise<void>;
}

export interface PriceProps {
  control: Control<DexFindPoolForm>;
}

export interface UseAddNativeTokenLiquidityArgs {
  control: Control<DexFindPoolForm>;
  isStable: boolean;
  account: string;
}

export interface FindPoolButtonProps {
  account: string;
  isStable: boolean;
  tokenAType: string;
  tokenBType: string;
  isCreatingPair: boolean;
  control: Control<DexFindPoolForm>;
  getValues: UseFormGetValues<DexFindPoolForm>;
  setCreatingPair: Dispatch<SetStateAction<boolean>>;
}
