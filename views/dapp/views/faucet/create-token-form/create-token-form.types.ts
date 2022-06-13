import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

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
