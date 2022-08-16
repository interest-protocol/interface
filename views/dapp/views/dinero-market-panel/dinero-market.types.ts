import { UseFormResetField, UseFormReturn } from 'react-hook-form';

import { SafeDineroMarketUserData } from '@/utils/dinero-market/dinero-market.types';

type TDineroMarketMode = 'borrow' | 'repay';

export interface DineroMarketPanelProps {
  address: string;
  mode: TDineroMarketMode;
}

export interface DineroMarketSwitchProps extends DineroMarketPanelProps {
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
  isPair: boolean;
  isSubmitting: boolean;
  isGettingData: boolean;
  mode: 'borrow' | 'repay';
  onSubmitRepay: () => void;
  onSubmitBorrow: () => void;
  data: SafeDineroMarketUserData;
  form: UseFormReturn<IBorrowForm>;
  symbols: [string, string | undefined];
  handleAddAllowance: () => Promise<void>;
}
