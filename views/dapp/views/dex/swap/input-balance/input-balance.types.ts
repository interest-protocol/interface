import { ReactNode } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { ISwapForm } from '../swap.types';

export interface InputBalanceProps {
  register: UseFormRegister<ISwapForm>;
  setValue?: UseFormSetValue<ISwapForm>;
  name: 'tokenIn' | 'tokenOut';
  currencySelector: ReactNode;
  disabled?: boolean;
  max?: string;
}
