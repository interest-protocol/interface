import { BigNumber } from 'ethers';
export interface MyOpenPositionProps {
  isLoading: boolean;
  exchangeRate: BigNumber | undefined;
  myPositionData: [string, string, string, string, string, string];
}
