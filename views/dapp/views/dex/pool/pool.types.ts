import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { PoolType } from '@/constants';

import { SwapFormTokenData } from '../dex.types';
import { OnSelectCurrencyData } from '../swap/swap.types';

export interface PairsProps {
  perceptual: string;
  type: string;
  perceptualSelect: string;
  isSelect: boolean;
  setSelected: Dispatch<SetStateAction<string>>;
}

export interface PoolRowProps {
  pairAddress: string;
  symbol0: string;
  symbol1: string;
}

export interface ILiquidityForm {
  tokenIn: SwapFormTokenData;
  tokenOut: SwapFormTokenData;
}

export interface LiquidityDepositAmountProps {
  CurrencyChanger: ReactNode;
  name: 'tokenIn' | 'tokenOut';
  control: Control<ILiquidityForm>;
  register: UseFormRegister<ILiquidityForm>;
  setValue: UseFormSetValue<ILiquidityForm>;
}

export interface AddLiquidityCurrencyChooserProps {
  control: Control<ILiquidityForm>;
  onSelectCurrency: (
    name: 'pairItem1' | 'pairItem2'
  ) => (token: OnSelectCurrencyData) => void;
}

export interface RecommendedPoolsProps {
  type: PoolType;
}
