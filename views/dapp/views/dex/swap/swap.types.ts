import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { SwapFormTokenData } from '@/views/dapp/views/dex/dex.types';

export interface ISwapForm {
  slippage: number;
  deadline: number;
  tokenIn: SwapFormTokenData;
  tokenOut: SwapFormTokenData;
}

export interface LocalSwapSettings {
  slippage: number; // 20 equals 20%
  deadline: number; // minutes
}

export interface AmountCacheValue {
  timestamp: number;
  amountOut: string;
}

export interface SwapFormProps {
  control: Control<ISwapForm>;
  register: UseFormRegister<ISwapForm>;
  setValue: UseFormSetValue<ISwapForm>;
  getValues: UseFormGetValues<ISwapForm>;
}
