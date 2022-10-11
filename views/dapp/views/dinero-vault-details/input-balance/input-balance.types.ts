import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { IVaultForm } from '../dinero-vault-details.types';

export interface InputBalanceProps {
  label?: string;
  name: 'value';
  register: UseFormRegister<IVaultForm>;
  setValue?: UseFormSetValue<IVaultForm>;
  max: number;
  symbol: string;
  address: string;
  isLoading: boolean;
}
