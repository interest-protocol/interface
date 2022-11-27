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
}

export interface BurnButtonProps {
  data: SyntheticMarketData;
  form: UseFormReturn<ISyntheticForm>;
  refetch: () => Promise<void>;
}

export interface RedStoneSubmitHandlerArgs<T> {
  contract: SyntheticsMinterAbi;
  data: SyntheticMarketData;
  collateral: T;
  synt: T;
}
