import { BigNumber } from 'ethers';
export interface MyOpenPositionProps {
  isPair: boolean;
  isLoading: boolean;
  tokenSymbol: string;
  pairTokenSymbol: string;
  exchangeRate: BigNumber;
  myPositionData: ReadonlyArray<string>;
}
