import { BigNumber } from 'ethers';
export interface MyOpenPositionProps {
  isLoading: boolean;
  marketName: string;
  collateralUSDPrice: BigNumber;
  myPositionData: ReadonlyArray<string>;
}
