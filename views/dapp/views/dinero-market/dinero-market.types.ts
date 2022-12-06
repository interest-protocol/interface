import { BigNumber } from 'ethers';
import { Result } from 'ethers/lib/utils';
import { InterestViewDinero } from 'types/ethers-contracts/InterestViewDineroV2Abi';

import { DineroMarketKind } from '@/constants';

import { BorrowSortByFilter } from './components/borrow-filters/borrow-filters.types';

export interface DineroMarketSummary {
  totalCollateral: BigNumber;
  LTV: BigNumber;
  interestRate: BigNumber;
  liquidationFee: BigNumber;
  collateralUSDPrice: BigNumber;
  userElasticLoan: BigNumber;
  kind: DineroMarketKind;
  symbol0: string;
  symbol1: string;
  name: string;
  stable: boolean;
  marketAddress: string;
  collateralDecimals: number;
  collateralAddress: string;
}

export type TDineroMarketDataKeys =
  | 'totalCollateral'
  | 'LTV'
  | 'interestRate'
  | 'liquidationFee'
  | 'collateralUSDPrice'
  | 'userElasticLoan';

export type TDineroMarketData =
  | ([
      InterestViewDinero.DineroMarketSummaryStructOutput,
      InterestViewDinero.DineroMarketSummaryStructOutput[],
      InterestViewDinero.DineroMarketSummaryStructOutput[]
    ] & {
      nativeMarket: InterestViewDinero.DineroMarketSummaryStructOutput;
      erc20Markets: InterestViewDinero.DineroMarketSummaryStructOutput[];
      lpMarkets: InterestViewDinero.DineroMarketSummaryStructOutput[];
    })
  | undefined
  | Result;

export type TGetSafeDineroMarketSummaryData = (
  chainId: number,
  data: TDineroMarketData
) => ReadonlyArray<DineroMarketSummary>;

export interface IDineroMarketForm {
  search: string;
  onlyBorrowing: boolean;
  sortBy: BorrowSortByFilter;
}
