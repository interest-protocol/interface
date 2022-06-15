import { BigNumber, CallOverrides } from 'ethers';

import {
  DineroMarketSummaryStructOutput,
  DineroMarketUserDataStructOutput,
} from '../../types/ethers-contracts/InterestViewDineroAbi';

export type GetDineroMarketSummary = (
  chainId: number,
  dineroMarkets: Array<string>,
  overrides: CallOverrides
) => Promise<DineroMarketSummaryStructOutput[]>;

export type GetUserDineroMarketData = (
  chainId: number,
  user: string,
  dineroMarket: string,
  tokens: Array<string>,
  overrides: CallOverrides
) => Promise<
  [DineroMarketUserDataStructOutput, BigNumber[], BigNumber[]] & {
    returnData: DineroMarketUserDataStructOutput;
    balances: BigNumber[];
    allowances: BigNumber[];
  }
>;
