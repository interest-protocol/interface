import { ReactNode } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { ILiquidityForm } from '../liquidity-form.types';

export interface InputBalanceProps {
  max: number;
  ratio: number;
  currencyPrefix: ReactNode;
  name: keyof ILiquidityForm;
  changeTarget: keyof ILiquidityForm;
  register: UseFormRegister<ILiquidityForm>;
  setValue: UseFormSetValue<ILiquidityForm>;
}
