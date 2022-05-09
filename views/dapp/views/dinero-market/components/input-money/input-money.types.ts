import { FC, SVGAttributes } from 'react';
import { UseFormReturn, UseFormStateReturn } from 'react-hook-form';

import { SafeDineroMarketUserData } from '@/utils/dinero-market/dinero-market.types';

import { IBorrowForm } from '../../dinero-market.types';

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
  data: SafeDineroMarketUserData;
  CurrencySVG: FC<SVGAttributes<SVGSVGElement>>;
  errors: UseFormStateReturn<IBorrowForm>['errors'];
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
  data: SafeDineroMarketUserData;
  name: 'repay.collateral' | 'repay.loan' | 'borrow.collateral' | 'borrow.loan';
}

export type TErrorMessageLabels = ['borrow' | 'repay', 'loan' | 'collateral'];

export interface InputErrorMessageProps {
  errors: UseFormStateReturn<IBorrowForm>['errors'];
  labels: TErrorMessageLabels;
}
