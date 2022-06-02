import { ReactNode } from 'react';
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { IFaucetForm } from './../faucet.types';

export interface InputBalanceProps {
  getValues: UseFormGetValues<IFaucetForm>;
  register: UseFormRegister<IFaucetForm>;
  setValue?: UseFormSetValue<IFaucetForm>;
  name: 'value' | 'currency';
  suffix: ReactNode;
  disabled?: boolean;
}
