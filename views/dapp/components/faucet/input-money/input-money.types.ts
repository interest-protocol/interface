import { ReactNode } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { IFaucetForm } from './../faucet.types';

export interface InputMoneyProps {
  max?: number;
  label: string;
  amount: string;
  amountUSD: number;
  currencyPrefix: ReactNode;
  register: UseFormRegister<IFaucetForm>;
  setValue?: UseFormSetValue<IFaucetForm>;
  name: 'value' | 'currency';
}
