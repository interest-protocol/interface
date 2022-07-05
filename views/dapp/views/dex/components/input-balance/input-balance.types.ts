import { ReactNode } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { ISwapForm } from '../../dex.types';

export interface InputBalanceProps {
  register: UseFormRegister<ISwapForm>;
  setValue?: UseFormSetValue<ISwapForm>;
  name: 'tokenIn.value' | 'tokenOut.value';
  currencySelector: ReactNode;
  disabled?: boolean;
  max?: string;
}
