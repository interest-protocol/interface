import { ReactNode } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { ISwapForm } from '../swap.types';

export interface InputBalanceProps {
  max?: string;
  balance: number;
  disabled?: boolean;
  currencySelector: ReactNode;
  name: 'tokenIn' | 'tokenOut';
  register: UseFormRegister<ISwapForm>;
  setValue?: UseFormSetValue<ISwapForm>;
  handleSelectedByUser: () => void;
}
