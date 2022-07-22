import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { SwapSelectCurrencyProps } from '../dex/dex.types';

interface FormValue {
  address: string;
  decimals: number;
  symbol: string;
}

export interface DexFindPoolForm {
  tokenA: FormValue;
  tokenB: FormValue;
  isStable: boolean;
  tokenAAmount: string;
  tokenBAmount: string;
}

export interface FindPoolProps {
  control: Control<DexFindPoolForm>;
  setValue: UseFormSetValue<DexFindPoolForm>;
  currencyAChargerArgs: Omit<SwapSelectCurrencyProps, 'currentToken'>;
  currencyBChargerArgs: Omit<SwapSelectCurrencyProps, 'currentToken'>;
}

export interface CreatePoolProps {
  control: Control<DexFindPoolForm>;
  register: UseFormRegister<DexFindPoolForm>;
}
