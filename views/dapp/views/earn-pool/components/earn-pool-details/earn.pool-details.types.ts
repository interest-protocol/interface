import { SafeFarmSummaryData } from '../../../earn/earn.types';

export type EarnPoolDetailsProps = SafeFarmSummaryData['farms'][number] & {
  chainId: number;
};
