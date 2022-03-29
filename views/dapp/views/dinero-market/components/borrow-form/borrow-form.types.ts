import { FC, SVGAttributes } from 'react';
import { UseFormReturn, UseFormStateReturn } from 'react-hook-form';

import { IBorrowForm } from '../../dinero-market.types';

export interface IBorrowFormField {
  max?: number;
  label: string;
  amount: string;
  currency: string;
  amountUSD: number;
  CurrencySVG: FC<SVGAttributes<SVGSVGElement>>;
  name: 'repay.collateral' | 'repay.loan' | 'borrow.collateral' | 'borrow.loan';
}

export interface BorrowFormButtonProps
  extends Pick<
    UseFormReturn<IBorrowForm>,
    'control' | 'setError' | 'clearErrors'
  > {
  isBorrow?: boolean;
  currencyDiff: number;
  onSubmit: () => void;
  currencyAmount: number;
  ltvRatio: number | undefined;
  errors: UseFormStateReturn<IBorrowForm>['errors'];
}
export interface BorrowFormProps extends UseFormReturn<IBorrowForm> {
  loading?: boolean;
  isBorrow?: boolean;
  onSubmit: () => void;
  currencyDiff?: number;
  currencyAmount: number;
  ltvRatio: number | undefined;
  loanData: ReadonlyArray<string>;
  fields: ReadonlyArray<IBorrowFormField>;
}

export interface BorrowFormLiquidationProps
  extends Pick<UseFormReturn<IBorrowForm>, 'control' | 'setValue'> {
  ltvRatio: number | undefined;
}
