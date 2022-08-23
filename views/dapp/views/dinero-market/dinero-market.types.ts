import { BigNumber } from 'ethers';

import { BorrowSortByFilter } from './components/borrow-filters/borrow-filters.types';

export interface DineroMarketSummary {
  totalCollateral: BigNumber;
  LTV: BigNumber;
  interestRate: BigNumber;
  liquidationFee: BigNumber;
  collateralUSDPrice: BigNumber;
  userElasticLoan: BigNumber;
  isPair: boolean;
  symbol0: string;
  symbol1: string;
  name: string;
  stable: boolean;
  marketAddress: string;
  collateralDecimals: number;
  collateralAddress: string;
}

export interface IDineroMarketForm {
  search: string;
  onlyBorrowing: boolean;
  sortBy: BorrowSortByFilter;
}
