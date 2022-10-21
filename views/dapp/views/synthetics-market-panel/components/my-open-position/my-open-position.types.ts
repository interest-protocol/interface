import { BigNumber } from 'ethers';
export interface MyOpenPositionProps {
  symbol: string;
  isLoading: boolean;
  collateralUSDPrice: BigNumber;
  myPositionData: ReadonlyArray<string>;
}
