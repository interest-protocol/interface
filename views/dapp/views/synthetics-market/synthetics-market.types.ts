import { BigNumber } from 'ethers';

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
}

export interface ISyntheticMarketSummaryForm {
  search: string;
  onlyMinted: boolean;
  sortBy: SyntheticMarketSortByFilter;
}
