import { FC, SVGAttributes } from 'react';
import { UseFormReturn } from 'react-hook-form';

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
  currencyDiff?: number;
  CurrencySVG: FC<SVGAttributes<SVGSVGElement>>;
  name: 'repay.collateral' | 'repay.loan' | 'borrow.collateral' | 'borrow.loan';
}

export interface InputMoneySuffixProps
  extends Pick<UseFormReturn<IBorrowForm>, 'control'> {
  amountUSD: number;
  name: 'repay.collateral' | 'repay.loan' | 'borrow.collateral' | 'borrow.loan';
}

export interface InputMaxButtonProps
  extends Pick<UseFormReturn<IBorrowForm>, 'control' | 'setValue'> {
  max?: number;
  currencyDiff: number;
  name: 'repay.collateral' | 'repay.loan' | 'borrow.collateral' | 'borrow.loan';
}
