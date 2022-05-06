import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

export interface InputStakeProps
  extends Pick<UseFormReturn<{ value: number }>, 'register' | 'setValue'> {
  label: string;
  amount: number;
  currencyPrefix: ReactNode;
}
