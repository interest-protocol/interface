import { Control } from 'react-hook-form';

import {
  DineroMarketSummary,
  IDineroMarketForm,
} from '@/views/dapp/views/dinero-market/dinero-market.types';

export interface BorrowTableProps {
  markets: ReadonlyArray<DineroMarketSummary>;
  control: Control<IDineroMarketForm>;
  chainId: number;
}
