import { BigNumber } from 'ethers';
export interface MyOpenPositionProps {
  isLoading: boolean;
  tokenSymbol: string;
  pairTokenSymbol: string;
  exchangeRate: BigNumber;
  myPositionData: [string, string, string, string, string, string];
}
