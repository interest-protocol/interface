import { Dispatch, SetStateAction, SVGAttributes } from 'react';

export interface PairsProps {
  perceptual: string;
  type: string;
  perceptualSelect: string;
  isSelect: boolean;
  setSelected: Dispatch<SetStateAction<string>>;
}

export interface LiquidityProps {
  Par1TokenSVG: React.FC<SVGAttributes<SVGSVGElement>>;
  Par2TokenSVG: React.FC<SVGAttributes<SVGSVGElement>>;
  symbol1: string;
  symbol2: string;
  perceptual: string;
  minValue: string;
  maxValue: string;
  hasWarning?: boolean;
}

export interface LiquidityDetailsCardLineProps {
  TokenSVG: React.FC<SVGAttributes<SVGSVGElement>>;
  symbol: string;
  value: string;
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
  lines: ReadonlyArray<LiquidityDetailsCardLineProps>;
}
