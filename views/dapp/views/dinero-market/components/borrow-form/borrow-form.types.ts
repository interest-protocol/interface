import { FC, SVGAttributes } from 'react';
import { UseFormReturn } from 'react-hook-form';

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
  extends Pick<UseFormReturn<IBorrowForm>, 'control'> {
  isBorrow?: boolean;
}
export interface BorrowFormProps extends UseFormReturn<IBorrowForm> {
  loading?: boolean;
  isBorrow?: boolean;
  ltvRatio: number | undefined;
  loanData: ReadonlyArray<string>;
  onSubmit: (data: IBorrowForm) => void;
  fields: ReadonlyArray<IBorrowFormField>;
}

export interface BorrowFormLiquidationProps
  extends Pick<UseFormReturn<IBorrowForm>, 'control' | 'setValue'> {
  ltvRatio: number | undefined;
}
