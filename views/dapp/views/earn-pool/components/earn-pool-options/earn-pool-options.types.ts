import { EarnTableProps } from '../../../earn/components/earn-table/earn-table.types';
import { SafeFarmSummaryData } from '../../../earn/earn.types';

export interface EarnOptionsProps {
  farm: SafeFarmSummaryData['farms'][number];
  intUSDPrice: SafeFarmSummaryData['intUSDPrice'];
  mutate: EarnTableProps['mutate'];
  loading: boolean;
}
