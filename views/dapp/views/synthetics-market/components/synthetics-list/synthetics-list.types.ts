import { Control } from 'react-hook-form';

import {
  ISyntheticMarketSummary,
  ISyntheticMarketSummaryForm,
} from '../../synthetics-market.types';

export interface SyntheticsListProps {
  markets: ReadonlyArray<ISyntheticMarketSummary>;
  control: Control<ISyntheticMarketSummaryForm>;
  chainId: number;
}
