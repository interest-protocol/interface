import { Control } from 'react-hook-form';

import {
  ISyntheticMarketSummary,
  ISyntheticMarketSummaryForm,
} from '../../synthetics-market.types';

export interface SyntheticsListProps {
  chainId: number;
  loading: boolean;
  markets: ReadonlyArray<ISyntheticMarketSummary>;
  control: Control<ISyntheticMarketSummaryForm>;
}
export interface SyntheticsListCardProps {
  chainId: number;
  data: ISyntheticMarketSummary;
}

export interface CustomUrlProps {
  market: ISyntheticMarketSummary;
  collateralSymbol: string;
}
