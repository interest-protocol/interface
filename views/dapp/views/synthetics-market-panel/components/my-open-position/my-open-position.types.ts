import { BigNumber } from 'ethers';
export interface MyOpenPositionProps {
  isLoading: boolean;
  symbols: [string, string];
  collateralUSDPrice: BigNumber;
  myPositionData: ReadonlyArray<string>;
}
