import { ReactNode } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { IAddLiquidityForm } from '../liquidity-form.types';

export interface InputBalanceProps {
  balance: number;
  disabled?: boolean;
  currencyPrefix: ReactNode;
  name: keyof IAddLiquidityForm;
  register: UseFormRegister<IAddLiquidityForm>;
  setValue: UseFormSetValue<IAddLiquidityForm>;
}
