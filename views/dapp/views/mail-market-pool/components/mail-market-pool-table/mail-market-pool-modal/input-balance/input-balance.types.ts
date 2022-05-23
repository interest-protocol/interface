import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { IFaucetForm } from '../faucet.types';

export interface InputBalanceProps {
  label: string;
  getValues: UseFormGetValues<IFaucetForm>;
  register: UseFormRegister<IFaucetForm>;
  setValue?: UseFormSetValue<IFaucetForm>;
  name: 'value' | 'currency';
}
