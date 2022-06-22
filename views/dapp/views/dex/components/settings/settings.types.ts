import { ReactNode } from 'react';
import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { ISwapForm } from '../../dex.types';

export interface FieldProps {
  label: string;
  step: string;
  name: 'slippage' | 'deadline';
  placeholder: string;
  suffix?: ReactNode;
  prefix?: ReactNode;
  register: UseFormRegister<ISwapForm>;
}

export interface SwapSettingsProps {
  toggle: () => void;
  control: Control<ISwapForm>;
  setValue: UseFormSetValue<ISwapForm>;
  register: UseFormRegister<ISwapForm>;
}
