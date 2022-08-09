import { BigNumber } from 'ethers';
import { ReactNode } from 'react';

import { SafeFarmSummaryData } from '../../earn.types';

export interface EarnTableProps {
  loading: boolean;
  isPools?: boolean;
  isDesktop: boolean;
  farms: SafeFarmSummaryData['farms'];
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
  farm: SafeFarmSummaryData['farms'][number];
  intUSDPrice: SafeFarmSummaryData['intUSDPrice'];
}
