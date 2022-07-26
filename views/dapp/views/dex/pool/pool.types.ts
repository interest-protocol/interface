import { PoolType } from '@/constants';

export interface PoolRowProps {
  pairAddress: string;
  symbol0: string;
  symbol1: string;
}

export interface RecommendedPoolsProps {
  type: PoolType;
}
