export interface DEXPoolDetailsViewProps {
  pairAddress: string;
}

export interface LiquidityDetailsCardLineProps {
  value: string;
  symbol: string;
}

export interface LiquidityDetailsCardProps {
  lines: ReadonlyArray<LiquidityDetailsCardLineProps>;
}
