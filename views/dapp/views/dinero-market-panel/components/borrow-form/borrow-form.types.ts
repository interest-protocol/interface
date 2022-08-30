import { UseFormReturn, UseFormStateReturn } from 'react-hook-form';

import {
  DineroMarketData,
  IBorrowForm,
  IBorrowFormField,
} from '../../dinero-market.types';

export interface BorrowFormButtonProps
  extends Pick<
    UseFormReturn<IBorrowForm>,
    'control' | 'setError' | 'clearErrors'
  > {
  isBorrow?: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
  data: DineroMarketData;
  errors: UseFormStateReturn<IBorrowForm>['errors'];
  handleAddAllowance: () => Promise<void>;
}
export interface BorrowFormProps extends UseFormReturn<IBorrowForm> {
  account: string;
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
