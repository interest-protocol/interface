import { Dispatch, SetStateAction } from 'react';

import { PoolType } from '@/constants';
import { Address } from '@/interface';

export interface PoolRowProps {
  chainId: number;
  symbol0: string;
  symbol1: string;
  address0: Address;
  address1: Address;
  pairAddress: string;
}

export interface RecommendedPoolsProps {
  type: PoolType;
  chainId: number;
}

export interface PoolProps {
  poolTypeState: {
    poolType: PoolType;
    setPoolType: Dispatch<SetStateAction<PoolType>>;
  };
}
