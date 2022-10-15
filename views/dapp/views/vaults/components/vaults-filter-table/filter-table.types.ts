import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { IVaultForm } from '../../vaults.types';

export interface FilterProps {
  control: Control<IVaultForm>;
  setValue: UseFormSetValue<IVaultForm>;
}

export interface InputSearchProps {
  register: UseFormRegister<IVaultForm>;
  setValue: UseFormSetValue<IVaultForm>;
}
