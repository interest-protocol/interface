import { ContractTransaction } from 'ethers';
import { FC, SVGAttributes } from 'react';
import { UseFormReturn, UseFormStateReturn } from 'react-hook-form';

import { MarketAndBalancesData } from '@/utils/dinero-market/dinero-market.types';

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
  onSubmit: () => void;
  isSubmitting: boolean;
  data: MarketAndBalancesData;
  errors: UseFormStateReturn<IBorrowForm>['errors'];
  handleAddAllowance: () => Promise<ContractTransaction> | undefined;
}
export interface BorrowFormProps extends UseFormReturn<IBorrowForm> {
  loading?: boolean;
  isBorrow?: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
  data: MarketAndBalancesData;
  fields: ReadonlyArray<IBorrowFormField>;
  handleAddAllowance: () => Promise<ContractTransaction> | undefined;
}

export interface BorrowFormSelectLTVProps
  extends Pick<UseFormReturn<IBorrowForm>, 'control' | 'setValue'> {
  isBorrow: boolean;
  data: MarketAndBalancesData;
}

export interface BorrowFormLoanInfoProps
  extends Pick<UseFormReturn<IBorrowForm>, 'control'> {
  data: MarketAndBalancesData;
  isBorrow: boolean;
}
