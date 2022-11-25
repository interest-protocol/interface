import { Result } from '@ethersproject/abi';
import { BigNumber } from 'ethers';
import { InterestViewDinero } from 'types/ethers-contracts/InterestViewDineroV2Abi';

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

export interface SyntheticMarketProps {
  redStone?: boolean;
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
