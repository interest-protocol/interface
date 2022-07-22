import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';

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
  currencyAChargerArgs: Omit<SwapSelectCurrencyProps, 'currentToken'>;
  currencyBChargerArgs: Omit<SwapSelectCurrencyProps, 'currentToken'>;
}

export interface CreatePoolProps {
  needAllowance: [boolean, boolean];
  control: Control<DexFindPoolForm>;
  register: UseFormRegister<DexFindPoolForm>;
}

export interface CreatePoolFieldProps {
  needAllowance: boolean;
  name: 'tokenA' | 'tokenB';
  control: Control<DexFindPoolForm>;
  register: UseFormRegister<DexFindPoolForm>;
}
