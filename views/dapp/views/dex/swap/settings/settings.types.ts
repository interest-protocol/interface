import { ReactNode } from 'react';
import {
  Control,
  UseFormRegister,
  UseFormRegisterReturn,
  UseFormSetValue,
} from 'react-hook-form';

import { ISwapForm, LocalSwapSettings } from '../swap.types';

export interface FieldProps {
  label: string;
  placeholder: string;
  suffix?: ReactNode;
  prefix?: ReactNode;
  setRegister: () => UseFormRegisterReturn;
  max: string;
  type: string;
}

export interface SwapSettingsProps {
  toggle: () => void;
  control: Control<ISwapForm>;
  setValue: UseFormSetValue<ISwapForm>;
  setLocalSettings: (x: LocalSwapSettings) => void;
  register: UseFormRegister<ISwapForm>;
  localSettings: LocalSwapSettings;
}

export interface AutoFetchProps {
  setter: (value: boolean) => void;
  value: boolean;
}
