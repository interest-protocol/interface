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

export type TDexPoolDetailsData = undefined;

export type TProcessPairData = (
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
};
