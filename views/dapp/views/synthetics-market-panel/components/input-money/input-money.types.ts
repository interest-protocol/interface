import { Control, UseFormReturn, UseFormStateReturn } from 'react-hook-form';

import {
  ISyntheticForm,
  SyntheticMarketData,
  SyntheticsCurrencyIcons,
} from '../../synthetics-market.types';

export interface InputMoneyProps
  extends Pick<
    UseFormReturn<ISyntheticForm>,
    'register' | 'setValue' | 'control'
  > {
  max?: number;
  label: string;
  amount: string;
  currency: string;
  amountUSD: number;
  isBorrow?: boolean;
  data: SyntheticMarketData;
  errors: UseFormStateReturn<ISyntheticForm>['errors'];
  currencyIcons: SyntheticsCurrencyIcons;
  name: 'repay.collateral' | 'repay.loan' | 'borrow.collateral' | 'borrow.loan';
  disabled: boolean;
}

export interface InputMoneySuffixProps
  extends Pick<UseFormReturn<ISyntheticForm>, 'control'> {
  amountUSD: number;
  name: 'repay.collateral' | 'repay.loan' | 'borrow.collateral' | 'borrow.loan';
}

export interface InputMaxButtonProps
  extends Pick<UseFormReturn<ISyntheticForm>, 'setValue' | 'control'> {
  max?: number;
  isBorrow?: boolean;
  data: SyntheticMarketData;
  name: 'repay.collateral' | 'repay.loan' | 'borrow.collateral' | 'borrow.loan';
}

export type TErrorMessageLabels = ['borrow' | 'repay', 'loan' | 'collateral'];

export interface InputErrorMessageProps {
  errors: UseFormStateReturn<ISyntheticForm>['errors'];
  labels: TErrorMessageLabels;
}

export interface InputMaxTagProps {
  max?: number;
  isDNR: boolean;
  isBorrow: boolean;
  data: SyntheticMarketData;
  control: Control<ISyntheticForm>;
}
