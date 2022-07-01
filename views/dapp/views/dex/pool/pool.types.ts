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
  symbols: [string, string];
}

export interface ILiquidityForm {
  pairItem1: ICurrencyField;
  pairItem2: ICurrencyField;
}

export interface LiquidityDepositAmountProps {
  control: Control<ILiquidityForm>;
  name: 'pairItem1' | 'pairItem2';
}

export interface AddLiquidityCurrencyChooserProps {
  control: Control<ILiquidityForm>;
  onSelectCurrency: (
    name: 'pairItem1' | 'pairItem2'
  ) => (address: string) => void;
}
