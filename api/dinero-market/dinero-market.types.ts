import { CallOverrides } from 'ethers';

import { DineroMarketSummaryStructOutput } from '../../types/ethers-contracts/InterestViewAbi';

export type GetDineroMarketSummary = (
  chainId: number,
  dineroMarkets: Array<string>,
  overrides: CallOverrides
) => Promise<DineroMarketSummaryStructOutput[]>;
