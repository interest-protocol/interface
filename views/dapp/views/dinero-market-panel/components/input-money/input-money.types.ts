import { Control, UseFormReturn, UseFormStateReturn } from 'react-hook-form';
import { UseFormSetValue } from 'react-hook-form/dist/types/form';

import {
  DineroCurrencyIcons,
  DineroMarketData,
  IBorrowForm,
} from '../../dinero-market.types';

export interface InputMoneyProps
  extends Pick<
    UseFormReturn<IBorrowForm>,
    'register' | 'setValue' | 'control'
  > {
  max?: number;
  label: string;
  amount: string;
  currency: string;
  amountUSD: number;
  isBorrow?: boolean;
  data: DineroMarketData;
  errors: UseFormStateReturn<IBorrowForm>['errors'];
  currencyIcons: DineroCurrencyIcons;
  name: 'repay.collateral' | 'repay.loan' | 'borrow.collateral' | 'borrow.loan';
  disabled: boolean;
}

export interface InputMoneySuffixProps
  extends Pick<UseFormReturn<IBorrowForm>, 'control'> {
  amountUSD: number;
  name: 'repay.collateral' | 'repay.loan' | 'borrow.collateral' | 'borrow.loan';
}

export interface InputMaxButtonProps
  extends Pick<UseFormReturn<IBorrowForm>, 'setValue' | 'control'> {
  max?: number;
  isBorrow?: boolean;
  data: DineroMarketData;
  name: 'repay.collateral' | 'repay.loan' | 'borrow.collateral' | 'borrow.loan';
}

export type TErrorMessageLabels = ['borrow' | 'repay', 'loan' | 'collateral'];

export interface InputErrorMessageProps {
  errors: UseFormStateReturn<IBorrowForm>['errors'];
  labels: TErrorMessageLabels;
}

export interface InputMaxTagProps {
  max?: number;
  isDNR: boolean;
  isBorrow: boolean;
  data: DineroMarketData;
  control: Control<IBorrowForm>;
}
