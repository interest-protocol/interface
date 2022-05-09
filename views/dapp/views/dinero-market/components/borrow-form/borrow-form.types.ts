import { FC, SVGAttributes } from 'react';
import { UseFormReturn, UseFormStateReturn } from 'react-hook-form';

import { SafeDineroMarketUserData } from '@/utils/dinero-market/dinero-market.types';

import { IBorrowForm } from '../../dinero-market.types';

export interface IBorrowFormField {
  max?: number;
  label: string;
  amount: string;
  currency: string;
  amountUSD: number;
  CurrencySVG: FC<SVGAttributes<SVGSVGElement>>;
  disabled: boolean;
  name: 'repay.collateral' | 'repay.loan' | 'borrow.collateral' | 'borrow.loan';
}

export interface BorrowFormButtonProps
  extends Pick<
    UseFormReturn<IBorrowForm>,
    'control' | 'setError' | 'clearErrors'
  > {
  isBorrow?: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
  data: SafeDineroMarketUserData;
  errors: UseFormStateReturn<IBorrowForm>['errors'];
  handleAddAllowance: () => Promise<void>;
}
export interface BorrowFormProps extends UseFormReturn<IBorrowForm> {
  loading?: boolean;
  isBorrow?: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
  data: SafeDineroMarketUserData;
  fields: ReadonlyArray<IBorrowFormField>;
  handleAddAllowance: () => Promise<void>;
}

export interface BorrowFormSelectLTVProps
  extends Pick<UseFormReturn<IBorrowForm>, 'control' | 'setValue'> {
  isBorrow: boolean;
  data: SafeDineroMarketUserData;
}

export interface BorrowFormLoanInfoProps
  extends Pick<UseFormReturn<IBorrowForm>, 'control'> {
  data: SafeDineroMarketUserData;
  isBorrow: boolean;
}
