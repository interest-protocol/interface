import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { AddLocalToken } from '../faucet.types';

export type TCreateTokenFieldNames = 'amount' | 'symbol' | 'name';

export type TCreateTokenForm = Record<TCreateTokenFieldNames, string>;

export interface CreateTokenFieldProps {
  label: string;
  name: TCreateTokenFieldNames;
  register: UseFormRegister<TCreateTokenForm>;
}

export interface CreateTokenSupplyFieldProps {
  label: string;
  register: UseFormRegister<TCreateTokenForm>;
  setValue: UseFormSetValue<TCreateTokenForm>;
}

export interface CreateTokenFormProps {
  handleClose: () => void;
  addLocalToken: AddLocalToken;
}

export interface CreateTokenButtonProps {
  chainId: number;
  getValues: UseFormGetValues<TCreateTokenForm>;
  control: Control<TCreateTokenForm>;
  addLocalToken: CreateTokenFormProps['addLocalToken'];
}
