import { UseFormReturn } from 'react-hook-form';

import {
  ISyntheticForm,
  ISyntheticFormField,
} from '../../synthetics-market.types';
import { SyntheticMarketData } from './../../synthetics-market.types';

export interface SyntFormButtonProps {
  form: UseFormReturn<ISyntheticForm>;
  isMint?: boolean;
  data: SyntheticMarketData;
  refetch: () => Promise<void>;
}
export interface SyntFormProps {
  form: UseFormReturn<ISyntheticForm>;
  isMint?: boolean;
  data: SyntheticMarketData;
  fields: ReadonlyArray<ISyntheticFormField>;
  refetch: () => Promise<void>;
  isGettingData: boolean;
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

export interface MintButtonProps {
  data: SyntheticMarketData;
  form: UseFormReturn<ISyntheticForm>;
  refetch: () => Promise<void>;
  mintSynt: string;
  mintCollateral: string;
}

export interface BurnButtonProps {
  data: SyntheticMarketData;
  form: UseFormReturn<ISyntheticForm>;
  refetch: () => Promise<void>;
  burnSynt: string;
  burnCollateral: string;
}
