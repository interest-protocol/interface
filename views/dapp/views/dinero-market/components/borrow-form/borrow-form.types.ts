import { BigNumber, ContractTransaction } from 'ethers';
import { FC, SVGAttributes } from 'react';
import { UseFormReturn } from 'react-hook-form';

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
  extends Pick<UseFormReturn<IBorrowForm>, 'control'> {
  isBorrow?: boolean;
}
export interface BorrowFormProps extends UseFormReturn<IBorrowForm> {
  loading?: boolean;
  isBorrow?: boolean;
  loanData: ReadonlyArray<string>;
  onSubmit: (data: IBorrowForm) => void;
  fields: ReadonlyArray<IBorrowFormField>;
  data: GetDineroMarketUserDataReturn | undefined;
  allowance: BigNumber;
  handleAddAllowance: () => Promise<ContractTransaction> | undefined;
}

export interface BorrowFormSelectLTVProps
  extends Pick<UseFormReturn<IBorrowForm>, 'control' | 'setValue'> {
  data: GetDineroMarketUserDataReturn | undefined;
}
