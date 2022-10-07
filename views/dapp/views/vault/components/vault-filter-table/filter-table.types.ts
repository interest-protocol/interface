import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { IVaultForm } from '../../vault.types';

export interface IButtonOption {
  options: ReadonlyArray<boolean>;
  setValue: UseFormSetValue<IVaultForm>;
  getValues: UseFormGetValues<IVaultForm>;
}

export interface SwitchFilterProps {
  control: Control<IVaultForm>;
  setValue: UseFormSetValue<IVaultForm>;
}

export interface InputSearchProps {
  register: UseFormRegister<IVaultForm>;
  setValue: UseFormSetValue<IVaultForm>;
}