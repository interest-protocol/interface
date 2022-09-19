import { BigNumber } from 'ethers';
import { Dispatch, SetStateAction } from 'react';
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

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
  update: () => Promise<void>;
  tokenBalances: [BigNumber, BigNumber];
  getValues: UseFormGetValues<DexFindPoolForm>;
}

export interface CreatePoolFieldProps {
  needAllowance: boolean;
  name: 'tokenA' | 'tokenB';
  register: UseFormRegister<DexFindPoolForm>;
  setValue: UseFormSetValue<DexFindPoolForm>;
  update: () => Promise<void>;
  tokenBalance: BigNumber;
  getValues: UseFormGetValues<DexFindPoolForm>;
}

export interface PriceProps {
  control: Control<DexFindPoolForm>;
}
