import { ContractTransaction } from 'ethers';
import { UseFormResetField, UseFormReturn } from 'react-hook-form';

import { MarketAndBalancesData } from '@/utils/dinero-market/dinero-market.types';

export interface DineroMarketProps {
  currency: string;
  mode: 'borrow' | 'repay';
}

export interface DineroMarketSwitchProps extends DineroMarketProps {
  resetField: UseFormResetField<IBorrowForm>;
}

export interface IBorrowForm {
  repay: {
    collateral: string;
    loan: string;
    max: boolean;
  };
  borrow: {
    collateral: string;
    loan: string;
  };
}

export interface FormsProps {
  currency: string;
  isSubmitting: boolean;
  isGettingData: boolean;
  mode: 'borrow' | 'repay';
  onSubmitRepay: () => void;
  onSubmitBorrow: () => void;
  data: MarketAndBalancesData;
  form: UseFormReturn<IBorrowForm>;
  handleAddAllowance: () => Promise<ContractTransaction> | undefined;
}
