import { ReactNode } from 'react';
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { IFaucetForm } from './../faucet.types';

export interface InputBalanceProps {
  label: string;
  getValues: UseFormGetValues<IFaucetForm>;
  currencyPrefix: ReactNode;
  register: UseFormRegister<IFaucetForm>;
  setValue?: UseFormSetValue<IFaucetForm>;
  name: 'value' | 'currency';
}
