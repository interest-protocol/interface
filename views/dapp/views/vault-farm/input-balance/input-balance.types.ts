import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { IVaultFarmForm } from '../vault-farm.types';

export interface InputBalanceProps {
  label?: string;
  name: 'value';
  register: UseFormRegister<IVaultFarmForm>;
  setValue?: UseFormSetValue<IVaultFarmForm>;
  max: number;
}
