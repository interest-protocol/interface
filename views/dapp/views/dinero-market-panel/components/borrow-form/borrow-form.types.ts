import { UseFormReturn, UseFormStateReturn } from 'react-hook-form';

import { TypeSVG } from '@/interface';

import { DineroMarketData, IBorrowForm } from '../../dinero-market.types';

export interface IBorrowFormField {
  max?: number;
  label: string;
  amount: string;
  currency: string;
  amountUSD: number;
  disabled: boolean;
  currencyIcons: [TypeSVG, TypeSVG | null];
  name: 'repay.collateral' | 'repay.loan' | 'borrow.collateral' | 'borrow.loan';
}

export interface BorrowFormButtonProps
  extends Pick<
    UseFormReturn<IBorrowForm>,
    'control' | 'setError' | 'clearErrors'
  > {
  isPair: boolean;
  isBorrow?: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
  data: DineroMarketData;
  errors: UseFormStateReturn<IBorrowForm>['errors'];
  handleAddAllowance: () => Promise<void>;
}
export interface BorrowFormProps extends UseFormReturn<IBorrowForm> {
  account: string;
  isPair: boolean;
  loading?: boolean;
  isBorrow?: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
  data: DineroMarketData;
  fields: ReadonlyArray<IBorrowFormField>;
  handleAddAllowance: () => Promise<void>;
}

export interface BorrowFormSelectLTVProps
  extends Pick<UseFormReturn<IBorrowForm>, 'control' | 'setValue'> {
  isBorrow: boolean;
  data: DineroMarketData;
}

export interface BorrowFormLoanInfoProps
  extends Pick<UseFormReturn<IBorrowForm>, 'control'> {
  data: DineroMarketData;
  isBorrow: boolean;
}

export type TGetRepayFields = (
  data: DineroMarketData,
  collateralSymbol: [string, string | undefined]
) => ReadonlyArray<IBorrowFormField>;

export type TGetBorrowFields = (
  data: DineroMarketData,
  collateralSymbol: [string, string | undefined]
) => ReadonlyArray<IBorrowFormField>;
