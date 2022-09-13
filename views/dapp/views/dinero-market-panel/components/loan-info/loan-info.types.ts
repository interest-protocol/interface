import { DineroMarketKind } from '@/constants';

export interface LoanInfoProps {
  kind: DineroMarketKind;
  isLoading: boolean;
  loanInfoData: ReadonlyArray<string>;
}
