export interface DEXPoolDetailsViewProps {
  tokens: [string, string];
}

export interface LiquidityDetailsCardLineProps {
  value: string;
  symbol: string;
  perceptual: string;
}

export interface LiquidityDetailsCardPriceProps {
  title: string;
  price: string;
  symbol1: string;
  symbol2: string;
}

export interface LiquidityDetailsCardProps {
  title: string;
  totalDeposits: string;
  lines: ReadonlyArray<LiquidityDetailsCardLineProps>;
}
