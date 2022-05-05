import { BigNumber } from 'ethers';

import { GetFarmSummaryReturn } from '@/api/casa-de-papel/casa-de-papel.types';
import { CurrencyAmount, ERC20, FarmV2, IntMath, LPPairV2 } from '@/sdk';

export type TCalculateFarmTVL = (
  basePrice: BigNumber,
  baseToken: ERC20,
  farm: FarmV2<LPPairV2>
) => string;

export type TCalculateFarmBaseAPR = (
  chainId: number,
  farm: FarmV2<LPPairV2 | ERC20>,
  intPerBlock: BigNumber,
  intUSDPrice: BigNumber,
  stakeAmount: BigNumber,
  stakeTokeUSDPrice: BigNumber
) => string;

export type TCalculateAllocation = (farm: FarmV2<ERC20 | LPPairV2>) => string;

export type TCalculateFarmTokenPrice = (
  chainId: number,
  baseTokenAddress: string,
  basePrice: BigNumber,
  farm: FarmV2<LPPairV2>,
  totalSupply: BigNumber
) => IntMath;

export interface SafeFarmData<T> {
  farm: FarmV2<T>;
  allocation: string;
  tvl: string;
  apr: string;
  farmTokenPrice: CurrencyAmount<ERC20 | LPPairV2>;
}

export interface SafeFarmSummaryData {
  pools: ReadonlyArray<SafeFarmData<ERC20>>;
  farms: ReadonlyArray<SafeFarmData<LPPairV2>>;
  loading: boolean;
  intUSDPrice: BigNumber;
}

export type GetSafeFarmSummaryData = (
  chainId: number | null,
  data: GetFarmSummaryReturn | undefined
) => SafeFarmSummaryData;
