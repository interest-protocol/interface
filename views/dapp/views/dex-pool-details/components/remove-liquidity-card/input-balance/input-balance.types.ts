import { ReactNode } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { IRemoveLiquidityForm } from '../remove-liquidity-card.types';

export interface InputBalanceProps {
  max: number;
  disabled?: boolean;
  currencyPrefix: ReactNode;
  name: keyof IRemoveLiquidityForm;
  register: UseFormRegister<IRemoveLiquidityForm>;
  setValue: UseFormSetValue<IRemoveLiquidityForm>;
}
