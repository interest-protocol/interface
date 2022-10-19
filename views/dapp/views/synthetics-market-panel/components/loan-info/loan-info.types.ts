import { TTranslatedMessage } from '@/interface';

export interface LoanInfoProps {
  isLoading: boolean;
  loanInfoData: ReadonlyArray<string>;
}

export type TLoanInfo = ReadonlyArray<
  Record<'tip' | 'name', TTranslatedMessage>
>;
