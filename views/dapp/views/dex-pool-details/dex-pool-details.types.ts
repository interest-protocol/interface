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
