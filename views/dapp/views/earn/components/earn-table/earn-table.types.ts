import { FC, ReactNode, SVGAttributes } from 'react';

import { MaybeArray } from './../../../../../../interface/index';

interface TCurrency {
  name: string;
  symbol: string;
  Icon: MaybeArray<FC<SVGAttributes<SVGSVGElement>>>;
}

export interface EarnTableProps {
  title: 'FARMS' | 'STAKE';
  currency: TCurrency;
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

export type TTableDataMock = (contract: 'stake' | 'farms') => {
  error: null | Error;
  data: ReadonlyArray<
    | {
        tvl: number;
        apy: number;
        apr: number;
        earned: string;
      }
    | {
        tvl: number;
        apy: number;
        apr: number;
        earnedFee: string;
      }
  >;
};
