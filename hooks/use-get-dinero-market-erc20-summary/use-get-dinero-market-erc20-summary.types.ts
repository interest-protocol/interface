import { BigNumber } from 'ethers';

export type SWRResponseData = {
  totalCollateral: BigNumber;
  exchangeRate: BigNumber;
  loan: [BigNumber, BigNumber, BigNumber] & {
    lastAccrued: BigNumber;
    INTEREST_RATE: BigNumber;
    feesEarned: BigNumber;
  };
  liquidationFee: BigNumber;
  ltv: BigNumber;
}[];
