import { BigNumber, ContractTransaction } from 'ethers';
import { FC, SVGAttributes } from 'react';
import { UseFormReturn, UseFormStateReturn } from 'react-hook-form';

import { GetDineroMarketUserDataReturn } from '@/utils/dinero-market/dinero-market.types';

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
  allowance: BigNumber;
  currencyAmount: number;
  ltvRatio: number | undefined;
  errors: UseFormStateReturn<IBorrowForm>['errors'];
  handleAddAllowance: () => Promise<ContractTransaction> | undefined;
}
export interface BorrowFormProps extends UseFormReturn<IBorrowForm> {
  loading?: boolean;
  isBorrow?: boolean;
  onSubmit: () => void;
  currencyDiff: number;
  allowance: BigNumber;
  currencyAmount: number;
  ltvRatio: number | undefined;
  loanData: ReadonlyArray<string>;
  fields: ReadonlyArray<IBorrowFormField>;
  data: GetDineroMarketUserDataReturn | undefined;
  handleAddAllowance: () => Promise<ContractTransaction> | undefined;
}

export interface BorrowFormSelectLTVProps
  extends Pick<UseFormReturn<IBorrowForm>, 'control' | 'setValue'> {
  data: GetDineroMarketUserDataReturn | undefined;
  currencyDiff: number;
}
