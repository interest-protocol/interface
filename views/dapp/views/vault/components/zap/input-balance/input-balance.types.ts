import { ReactNode } from 'react';
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { IZapForm } from '../zap.types';

export interface InputBalanceProps {
  label: ReactNode;
  getValues: UseFormGetValues<IZapForm>;
  currencyPrefix: ReactNode;
  register: UseFormRegister<IZapForm>;
  setValue?: UseFormSetValue<IZapForm>;
  name: 'value' | 'currency';
}
