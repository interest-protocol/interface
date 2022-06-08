import { ReactNode } from 'react';
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { ISwapForm } from '../../swap.types';
export interface InputBalanceProps {
  getValues: UseFormGetValues<ISwapForm>;
  register: UseFormRegister<ISwapForm>;
  setValue?: UseFormSetValue<ISwapForm>;
  name: 'target.value' | 'origin.value';
  currencySelector: ReactNode;
  disabled?: boolean;
}
