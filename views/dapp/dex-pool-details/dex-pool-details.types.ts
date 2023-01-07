import { BigNumber } from 'ethers';
import { Result } from 'ethers/lib/utils';
import { PairMetadataStructOutput } from 'types/ethers-contracts/InterestViewDexAbi';

export interface DEXPoolDetailsViewProps {
  pairAddress: string;
}

export interface LiquidityDetailsCardLineProps {
  value: string;
  symbol: string;
  address: string;
  isFetchingInitialData: boolean;
}

export interface LiquidityDetailsCardProps {
  isStable: boolean;
  lines: ReadonlyArray<LiquidityDetailsCardLineProps>;
}

export type TPoolDetailsKeys =
  | 'token0Metadata'
  | 'token1Metadata'
  | 'token0'
  | 'token1'
  | 'isStable'
  | 'reserve0'
  | 'reserve1';

export type TDexPoolDetailsData =
  | ([PairMetadataStructOutput, BigNumber[], BigNumber[]] & {
      pairMetadata: PairMetadataStructOutput;
      allowances: BigNumber[];
      balances: BigNumber[];
    })
  | undefined
  | Result;

export type TProcessPairData = (
  chainId: number,
  data: TDexPoolDetailsData,
  nativeBalance: string
) => {
  token0Metadata: {
    name: string;
    symbol: string;
    decimals: number;
  };
  token1Metadata: {
    name: string;
    symbol: string;
    decimals: number;
  };
  loading: boolean;
  pairExists: boolean;
  token0: string;
  token1: string;
  isStable: boolean;
  reserve0: BigNumber;
  reserve1: BigNumber;
  lpAllowance: BigNumber;
  lpBalance: BigNumber;
  token0Balance: BigNumber;
  token0Allowance: BigNumber;
  token1Balance: BigNumber;
  token1Allowance: BigNumber;
};
