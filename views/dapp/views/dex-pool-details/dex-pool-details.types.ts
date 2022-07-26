export interface DEXPoolDetailsViewProps {
  pairAddress: string;
}

export interface LiquidityDetailsCardLineProps {
  value: string;
  symbol: string;
}

export interface LiquidityDetailsCardProps {
  isStable: boolean;
  lines: ReadonlyArray<LiquidityDetailsCardLineProps>;
}
