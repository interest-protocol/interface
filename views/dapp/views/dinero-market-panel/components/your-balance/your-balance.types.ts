import { BigNumber } from 'ethers';
export interface YourBalanceProps {
  loading: boolean;
  dnrBalance: BigNumber;
  collateralName: string;
  collateralDecimals: number;
  collateralBalance: BigNumber;
  tokenSymbols: [string, string | undefined];
}
