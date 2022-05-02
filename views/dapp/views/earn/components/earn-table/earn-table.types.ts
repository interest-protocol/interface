import { BigNumber } from 'ethers';
import { ReactNode } from 'react';

import { PoolType } from '@/sdk/../../../../../../constants/farms';
import { FarmV2 } from '@/sdk/entities/farm-v2';

export interface EarnTableProps {
  type: PoolType;
  farms: ReadonlyArray<FarmV2>;
  loading: boolean;
  baseTokenPrice: BigNumber;
  intPerBlock: BigNumber;
}

export interface EarnCardProps {
  title: string;
  amount: string;
  shadow?: boolean;
  loading: boolean;
  amountUSD: string;
  button: ReactNode;
}

export interface EarnTableCollapsibleProps {
  baseTokenPrice: EarnTableProps['baseTokenPrice'];
  farm: FarmV2;
}

interface IUserData {
  stakingAmount: BigNumber;
  pendingRewards: BigNumber;
}

export interface IEarnTableData {
  lpBalance: BigNumber;
  totalSupply: BigNumber;
  userData: IUserData;
  allowance: BigNumber;
}
