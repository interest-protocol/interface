import { ReactNode } from 'react';
import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { IFaucetForm } from './../faucet.types';

export interface InputBalanceProps {
  label: string;
  currencyPrefix: ReactNode;
  register: UseFormRegister<IFaucetForm>;
  setValue?: UseFormSetValue<IFaucetForm>;
  name: 'amount' | 'token';
  chainId: number;
  control: Control<IFaucetForm>;
}
