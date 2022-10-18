import { Control } from 'react-hook-form';

import {
  DineroMarketSummary,
  IDineroMarketForm,
} from '../../synthetics-market.types';

export interface SyntheticsListProps {
  markets: ReadonlyArray<DineroMarketSummary>;
  control: Control<IDineroMarketForm>;
  chainId: number;
}
