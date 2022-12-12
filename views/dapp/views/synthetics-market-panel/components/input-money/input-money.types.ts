import { Control, UseFormReturn, UseFormStateReturn } from 'react-hook-form';

import { TTranslatedMessage } from '@/interface';

import {
  ISyntheticForm,
  SyntheticMarketData,
  SyntheticsCurrencyIcons,
  TValidSyntFormFieldNames,
} from '../../synthetics-market-panel.types';

export interface InputMoneyProps
  extends Pick<
    UseFormReturn<ISyntheticForm>,
    'register' | 'setValue' | 'control'
  > {
  max?: number;
  amount: string;
  currency: string;
  price: number;
  isMint?: boolean;
  data: SyntheticMarketData;
  label: TTranslatedMessage;
  errors: UseFormStateReturn<ISyntheticForm>['errors'];
  currencyIcons: SyntheticsCurrencyIcons;
  name: TValidSyntFormFieldNames;
  disabled: boolean;
}

export interface InputSuffixProps
  extends Pick<UseFormReturn<ISyntheticForm>, 'control'> {
  price: number;
  name: TValidSyntFormFieldNames;
  isStable: boolean;
}

export interface InputMaxButtonProps
  extends Pick<UseFormReturn<ISyntheticForm>, 'setValue' | 'control'> {
  max?: number;
  isMint?: boolean;
  data: SyntheticMarketData;
  name: TValidSyntFormFieldNames;
}

export type TErrorMessageLabels = ['mint' | 'burn', 'synt' | 'collateral'];

export interface InputErrorMessageProps {
  errors: UseFormStateReturn<ISyntheticForm>['errors'];
  labels: TErrorMessageLabels;
}

export interface InputMaxTagProps {
  max?: number;
  isMint: boolean;
  data: SyntheticMarketData;
  control: Control<ISyntheticForm>;
  isCollateral: boolean;
}
