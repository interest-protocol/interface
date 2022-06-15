import { UseFormResetField, UseFormReturn } from 'react-hook-form';

import { TOKEN_SYMBOL } from '@/sdk';
import { SafeDineroMarketUserData } from '@/utils/dinero-market/dinero-market.types';

export interface DineroMarketProps {
  tokenSymbol: TOKEN_SYMBOL;
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
  account: string;
  isSubmitting: boolean;
  isGettingData: boolean;
  mode: 'borrow' | 'repay';
  onSubmitRepay: () => void;
  onSubmitBorrow: () => void;
  data: SafeDineroMarketUserData;
  form: UseFormReturn<IBorrowForm>;
  handleAddAllowance: () => Promise<void>;
}
