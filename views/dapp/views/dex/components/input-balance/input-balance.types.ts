import { ReactNode } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { ISwapForm } from '../../swap/swap.types';

export interface InputBalanceProps {
  max?: string;
  balance: string;
  disabled?: boolean;
  currencySelector: ReactNode;
  register: UseFormRegister<ISwapForm>;
  setValue?: UseFormSetValue<ISwapForm>;
  name: 'tokenIn.value' | 'tokenOut.value';
}
