import { ContractTransaction } from 'ethers';
import { UseFormReturn } from 'react-hook-form';

import { MarketAndBalancesData } from '@/utils/dinero-market/dinero-market.types';
export interface DineroMarketProps {
  currency: string;
  mode: 'borrow' | 'repay';
}

export interface IBorrowForm {
  repay: {
    collateral: string;
    loan: string;
  };
  borrow: {
    collateral: string;
    loan: string;
  };
}

export interface FormsProps {
  currency: string;
  isGettingData: boolean;
  mode: 'borrow' | 'repay';
  onSubmitRepay: () => void;
  onSubmitBorrow: () => void;
  data: MarketAndBalancesData;
  form: UseFormReturn<IBorrowForm>;
  handleAddAllowance: () => Promise<ContractTransaction> | undefined;
}
