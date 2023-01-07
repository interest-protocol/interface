import { PoolType } from '@/constants';

export interface PoolRowProps {
  chainId: number;
  symbol0: string;
  symbol1: string;
  address0: string;
  address1: string;
  pairAddress: string;
}

export interface RecommendedPoolsProps {
  type: PoolType;
}
