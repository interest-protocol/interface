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
  name: 'tokenA' | 'tokenB';
  control: Control<DexFindPoolForm>;
  register: UseFormRegister<DexFindPoolForm>;
  setValue: UseFormSetValue<DexFindPoolForm>;
  currencyChargerArgs: Omit<SwapSelectCurrencyProps, 'currentToken'>;
}
