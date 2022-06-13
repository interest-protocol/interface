import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { IMAILMarketPoolForm } from '../mail-market-pool-modal.types';

export interface InputBalanceProps {
  label: string;
  name: 'value';
  register: UseFormRegister<IMAILMarketPoolForm>;
  setValue?: UseFormSetValue<IMAILMarketPoolForm>;
  max: number;
}
