import { TTranslatedMessage } from '@/interface';

export interface RewardsDataProps {
  isLoading: boolean;
  info: ReadonlyArray<string>;
}

export type TInfo = ReadonlyArray<Record<'tip' | 'name', TTranslatedMessage>>;
