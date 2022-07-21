import { ReactNode } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { ILiquidityForm } from '../liquidity-form.types';

export interface InputBalanceProps {
  max: number;
  disabled?: boolean;
  currencyPrefix: ReactNode;
  name: keyof ILiquidityForm;
  register: UseFormRegister<ILiquidityForm>;
  setValue: UseFormSetValue<ILiquidityForm>;
}
