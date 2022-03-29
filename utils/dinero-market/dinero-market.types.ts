import { BigNumber } from 'ethers';

export interface GetDineroMarketUserDataReturn {
  exchangeRate: BigNumber;
  loan: [BigNumber, BigNumber, BigNumber] & {
    lastAccrued: BigNumber;
    INTEREST_RATE: BigNumber;
    feesEarned: BigNumber;
  };
  liquidationFee: BigNumber;
  ltvRatio: BigNumber;
  userCollateral: BigNumber;
  userLoan: BigNumber;
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber };
  allowance: BigNumber;
}
