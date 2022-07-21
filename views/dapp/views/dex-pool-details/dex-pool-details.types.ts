export interface DEXPoolDetailsViewProps {
  pairAddress: string;
}

export interface LiquidityDetailsCardLineProps {
  value: string;
  symbol: string;
}

export interface LiquidityDetailsCardPriceProps {
  title: string;
  symbol1: string;
  symbol2: string;
}

export interface LiquidityDetailsCardProps {
  title: string;
  balance: string;
  lines: ReadonlyArray<LiquidityDetailsCardLineProps>;
}
