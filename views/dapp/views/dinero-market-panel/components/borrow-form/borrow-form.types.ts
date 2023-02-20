import { UseFormReturn } from 'react-hook-form';

import {
  DineroMarketData,
  IBorrowForm,
  IBorrowFormField,
} from '../../dinero-market.types';

export interface BorrowFormButtonProps {
  form: UseFormReturn<IBorrowForm>;
  isBorrow?: boolean;
  data: DineroMarketData;
  account: string;
  refetch: () => Promise<void>;
}
export interface BorrowFormProps {
  form: UseFormReturn<IBorrowForm>;
  account: string;
  isBorrow?: boolean;
  data: DineroMarketData;
  fields: ReadonlyArray<IBorrowFormField>;
  refetch: () => Promise<void>;
  isGettingData: boolean;
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

export interface BorrowButtonProps {
  data: DineroMarketData;
  account: string;
  form: UseFormReturn<IBorrowForm>;
  refetch: () => Promise<void>;
  borrowLoan: string;
  borrowCollateral: string;
}

export interface RepayButtonProps {
  data: DineroMarketData;
  account: string;
  form: UseFormReturn<IBorrowForm>;
  refetch: () => Promise<void>;
  repayLoan: string;
  repayCollateral: string;
}
