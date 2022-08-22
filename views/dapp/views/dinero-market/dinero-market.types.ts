import { BigNumber } from 'ethers';

export interface DineroMarketSummary {
  collateralAmount: BigNumber;
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
}
