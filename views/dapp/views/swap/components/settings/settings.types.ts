import { ReactNode } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { ISwapForm } from '../../swap.types';

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
  register: UseFormRegister<ISwapForm>;
}
