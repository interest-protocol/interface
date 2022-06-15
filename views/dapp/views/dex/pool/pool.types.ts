import { Dispatch, SetStateAction } from 'react';
import { Control } from 'react-hook-form';

import { ICurrencyField } from '../dex.types';

export interface PairsProps {
  perceptual: string;
  type: string;
  perceptualSelect: string;
  isSelect: boolean;
  setSelected: Dispatch<SetStateAction<string>>;
}

export interface LiquidityProps {
  amount: string;
  amountUSD: string;
  hasWarning?: boolean;
  symbols: [string, string];
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

export interface ILiquidityForm {
  pairItem1: ICurrencyField;
  pairItem2: ICurrencyField;
}

export interface LiquidityDepositAmountProps {
  control: Control<ILiquidityForm>;
  name: 'pairItem1' | 'pairItem2';
}
