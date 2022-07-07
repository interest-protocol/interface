import { ReactNode } from 'react';
import {
  Control,
  UseFormRegister,
  UseFormRegisterReturn,
} from 'react-hook-form';

import { ISwapForm } from '../swap.types';

export interface FieldProps {
  label: string;
  step: string;
  placeholder: string;
  suffix?: ReactNode;
  prefix?: ReactNode;
  setRegister: () => UseFormRegisterReturn;
  max: string;
}

export interface SwapSettingsProps {
  toggle: () => void;
  control: Control<ISwapForm>;
  setSlippage: (x: number) => void;
  setDeadline: (x: number) => void;
  register: UseFormRegister<ISwapForm>;
}
