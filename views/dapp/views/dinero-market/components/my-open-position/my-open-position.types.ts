import { BigNumber } from 'ethers';
export interface MyOpenPositionProps {
  isLoading: boolean;
  exchangeRate: BigNumber;
  myPositionData: [string, string, string, string, string, string];
}
