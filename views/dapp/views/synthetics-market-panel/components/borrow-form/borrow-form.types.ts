import { UseFormReturn } from 'react-hook-form';

import {
  ISyntheticForm,
  ISyntheticFormField,
} from '../../synthetics-market.types';
import { SyntheticMarketData } from './../../synthetics-market.types';

export interface BorrowFormButtonProps {
  form: UseFormReturn<ISyntheticForm>;
  isBorrow?: boolean;
  data: SyntheticMarketData;
  account: string;
  refetch: () => Promise<void>;
}
export interface BorrowFormProps {
  form: UseFormReturn<ISyntheticForm>;
  account: string;
  isBorrow?: boolean;
  data: SyntheticMarketData;
  fields: ReadonlyArray<ISyntheticFormField>;
  refetch: () => Promise<void>;
  isGettingData: boolean;
}

export interface BorrowFormSelectLTVProps
  extends Pick<UseFormReturn<ISyntheticForm>, 'control' | 'setValue'> {
  isBorrow: boolean;
  data: SyntheticMarketData;
}

export interface BorrowFormLoanInfoProps
  extends Pick<UseFormReturn<ISyntheticForm>, 'control'> {
  data: SyntheticMarketData;
  isBorrow: boolean;
}

export interface BorrowButtonProps {
  data: SyntheticMarketData;
  account: string;
  form: UseFormReturn<ISyntheticForm>;
  refetch: () => Promise<void>;
  borrowLoan: string;
  borrowCollateral: string;
}

export interface RepayButtonProps {
  data: SyntheticMarketData;
  account: string;
  form: UseFormReturn<ISyntheticForm>;
  refetch: () => Promise<void>;
  repayLoan: string;
  repayCollateral: string;
}
