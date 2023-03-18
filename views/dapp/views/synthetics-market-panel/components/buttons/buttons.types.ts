import { Dispatch, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { SyntheticsMinterAbi } from '../../../../../../types/ethers-contracts';
import {
  ISyntheticForm,
  SyntheticMarketData,
} from '../../synthetics-market-panel.types';

export interface MintButtonProps {
  data: SyntheticMarketData;
  form: UseFormReturn<ISyntheticForm>;
  refetch: () => Promise<void>;
  loadingState: {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
  };
}

export interface BurnButtonProps {
  data: SyntheticMarketData;
  form: UseFormReturn<ISyntheticForm>;
  refetch: () => Promise<void>;
  loadingState: {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
  };
}

export interface RedStoneSubmitHandlerArgs<T> {
  contract: SyntheticsMinterAbi;
  data: SyntheticMarketData;
  collateral: T;
  synt: T;
}
