import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
  ISyntheticForm,
  ISyntheticFormField,
} from '../../synthetics-market-panel.types';
import { SyntheticMarketData } from './../../synthetics-market-panel.types';

export interface SyntFormButtonProps {
  form: UseFormReturn<ISyntheticForm>;
  isMint?: boolean;
  mintButton: ReactNode;
  burnButton: ReactNode;
  data: SyntheticMarketData;
  refetch: () => Promise<void>;
}
export interface SyntFormProps {
  form: UseFormReturn<ISyntheticForm>;
  isMint?: boolean;
  mintButton: ReactNode;
  burnButton: ReactNode;
  isGettingData: boolean;
  data: SyntheticMarketData;
  refetch: () => Promise<void>;
  fields: ReadonlyArray<ISyntheticFormField>;
}

export interface SyntFormSelectLTVProps
  extends Pick<UseFormReturn<ISyntheticForm>, 'control' | 'setValue'> {
  isMint: boolean;
  data: SyntheticMarketData;
}

export interface SyntFormSyntInfoProps
  extends Pick<UseFormReturn<ISyntheticForm>, 'control'> {
  data: SyntheticMarketData;
  isMint: boolean;
}
