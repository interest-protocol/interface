import { BigNumber } from 'ethers';

import { SyntheticOracleType } from '@/constants';

export enum SyntheticMarketSortByFilter {
  Default,
  TVL,
  LTV,
  TransferFee,
  Price,
  Symbol,
}

export interface ISyntheticMarketSummary {
  TVL: BigNumber;
  LTV: BigNumber;
  transferFee: BigNumber;
  syntheticUSDPrice: BigNumber;
  userSyntheticMinted: BigNumber;
  syntheticAddress: string;
  marketAddress: string;
  symbol: string;
  chainId: number;
  id: number;
  name: string;
  oracleType: SyntheticOracleType;
  collateralAddress: string;
}

export interface ISyntheticMarketSummaryForm {
  search: string;
  onlyMinted: boolean;
  sortBy: SyntheticMarketSortByFilter;
}

interface FindSyntheticMarketPriceArg {
  oracleType: SyntheticOracleType;
  redStonePriceIndex: number;
  apiPrice: BigNumber;
  redStonePrices: BigNumber[];
}

export type FindSyntheticUSDPrice = (
  data: FindSyntheticMarketPriceArg
) => BigNumber;
