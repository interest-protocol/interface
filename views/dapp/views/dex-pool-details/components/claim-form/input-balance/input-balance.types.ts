import { ReactNode } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { IClaimForm } from '../claim-form.types';

export interface InputBalanceProps {
  max: number;
  currencyPrefix: ReactNode;
  name: keyof IClaimForm;
  register: UseFormRegister<IClaimForm>;
  setValue?: UseFormSetValue<IClaimForm>;
}
