import { BigNumber } from 'ethers';
import { ReactNode } from 'react';

import { CurrencyAmount, ERC20, LPPairV2 } from '@/sdk';
import { FarmV2 } from '@/sdk/entities/farm-v2';
import { SafeFarmData } from '@/utils/farms/farms.types';

export interface EarnTableProps {
  data: ReadonlyArray<SafeFarmData<ERC20 | LPPairV2>>;
  isPools?: boolean;
  loading: boolean;
  intUSDPrice: BigNumber;
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
  farmTokenPrice: CurrencyAmount<ERC20 | LPPairV2>;
  farm: FarmV2<ERC20 | LPPairV2>;
  intUSDPrice: BigNumber;
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
