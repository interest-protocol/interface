import { BigNumber } from 'ethers';

export interface MyOpenPositionProps {
  syntSymbol: string;
  isLoading: boolean;
  myPositionData: ReadonlyArray<string>;
  isStable: boolean;
  syntPrice: BigNumber;
  collateralSymbol: string;
}
