import { Result } from '@ethersproject/abi';
import { BigNumber } from 'ethers';
import { UseFormReturn } from 'react-hook-form';
import { InterestViewDinero } from 'types/ethers-contracts/InterestViewDineroV2Abi';

import { SyntheticOracleType } from '@/constants';

export enum SyntheticMarketSortByFilter {
  Default,
  Id,
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
  syntheticAddress: `0x${string}`;
  marketAddress: `0x${string}`;
  symbol: string;
  chainId: number;
  id: number;
  name: string;
  oracleType: SyntheticOracleType;
  collateralAddress: `0x${string}`;
  dataFeedId: string;
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

export type ProcessSyntheticMarketSummaryData = (
  chainId: number,
  data:
    | ([
        InterestViewDinero.SyntheticMarketSummaryStructOutput[],
        BigNumber[]
      ] & {
        data: InterestViewDinero.SyntheticMarketSummaryStructOutput[];
        redStonePrices: BigNumber[];
      })
    | undefined
    | Result
) => { markets: ReadonlyArray<ISyntheticMarketSummary>; loading: boolean };

export type TMarketsDataAttributes =
  | 'LTV'
  | 'fee'
  | 'TVL'
  | 'syntheticUSDPrice'
  | 'userSyntMinted';

export interface UseGetTokenUsdPriceArgs {
  chainId: number;
  account: string;
  marketAddress: string;
  dataFeedId: string;
}

export interface SyntheticsMarketProps {
  formSyntheticMarketSummary: UseFormReturn<ISyntheticMarketSummaryForm>;
}
