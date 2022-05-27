import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { IMAILMarketPoolForm } from '../mail-market-pool-modal.types';

export interface InputBalanceProps {
  label: string;
  name: 'value' | 'currency';
  register: UseFormRegister<IMAILMarketPoolForm>;
  setValue?: UseFormSetValue<IMAILMarketPoolForm>;
  getValues: UseFormGetValues<IMAILMarketPoolForm>;
}
