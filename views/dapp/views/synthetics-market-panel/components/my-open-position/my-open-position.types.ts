import { BigNumber } from 'ethers';

export interface MyOpenPositionProps {
  symbol: string;
  isLoading: boolean;
  syntUSDPrice: BigNumber;
  myPositionData: ReadonlyArray<string>;
}
