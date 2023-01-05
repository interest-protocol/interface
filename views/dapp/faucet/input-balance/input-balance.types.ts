import { ReactNode } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { IFaucetForm } from './../faucet.types';

export interface InputBalanceProps {
  label: string;
  currencyPrefix: ReactNode;
  register: UseFormRegister<IFaucetForm>;
  setValue?: UseFormSetValue<IFaucetForm>;
  name: 'amount' | 'type';
}
