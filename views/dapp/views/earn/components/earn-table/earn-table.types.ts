import { BigNumber } from 'ethers';
import { ReactNode } from 'react';
import { SWRResponse } from 'swr';

import { PoolType } from '@/constants/farms';
import { FarmV2 } from '@/sdk/entities/farm-v2';

export interface EarnTableProps {
  type: PoolType;
  farms: ReadonlyArray<FarmV2>;
  error: SWRResponse['error'];
  baseTokenPrice: BigNumber;
  intPerBlock: BigNumber;
}

export interface EarnCardProps {
  title: string;
  amount: string;
  shadow?: boolean;
  amountUSD: string;
  button: ReactNode;
}

export interface EarnTableCollapsibleProps {
  symbol: string;
  availableAmount: number;
  availableAmountUSD: number;
  stakedAmount: number;
  stakedAmountUSD: number;
  stakeRequestApproval?: boolean;
  earnedAmount: number;
  earnedAmountUSD: number;
}
