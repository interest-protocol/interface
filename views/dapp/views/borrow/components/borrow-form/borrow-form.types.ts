import { FC, SVGAttributes } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { IBorrowForm } from '../../borrow.types';

interface IBorrowFormField {
  max?: number;
  label: string;
  amount: string;
  currency: string;
  amountUSD: number;
  CurrencySVG: FC<SVGAttributes<SVGSVGElement>>;
  name: 'repay.collateral' | 'repay.loan' | 'borrow.collateral' | 'borrow.loan';
}

export interface BorrowFormButtonProps
  extends Pick<UseFormReturn<IBorrowForm>, 'watch'> {
  isBorrow?: boolean;
  buttonText: string;
}
export interface BorrowFormProps extends UseFormReturn<IBorrowForm> {
  isBorrow?: boolean;
  buttonText: string;
  onSubmit: (data: IBorrowForm) => void;
  fields: ReadonlyArray<IBorrowFormField>;
}
