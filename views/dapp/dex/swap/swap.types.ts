import { Dispatch, FC, SetStateAction } from 'react';
import { Control, UseFormSetValue } from 'react-hook-form';

import { SVGProps } from '@/components/svg/svg.types';

import { SwapFormTokenData } from '../dex.types';

export interface ISwapForm {
  tokenIn: SwapFormTokenData;
  tokenOut: SwapFormTokenData;
}

export interface AmountCacheValue {
  timestamp: number;
  amountOut: string;
}

export interface SwapManagerProps {
  chainId: number;
  control: Control<ISwapForm>;
  isFetchingAmountOutTokenOut: boolean;
  isFetchingAmountOutTokenIn: boolean;
  hasNoMarket: boolean;
  setValue: UseFormSetValue<ISwapForm>;
  setFetchingAmountOutTokenOut: Dispatch<SetStateAction<boolean>>;
  setFetchingAmountOutTokenIn: Dispatch<SetStateAction<boolean>>;
  setHasNoMarket: Dispatch<SetStateAction<boolean>>;
  setAmountOutError: Dispatch<SetStateAction<string | null>>;
  setSwapBase: Dispatch<SetStateAction<string | null>>;
}

export interface SwapViewButtonProps {
  disabled: boolean;
  onClick: () => void;
  loadingText: string | null;
  text: string;
}

export interface OnSelectCurrencyData {
  type: string;
  symbol: string;
  decimals: number;
}

export interface SwapMessageProps {
  color?: string;
  message: string;
  Icon: FC<SVGProps>;
}
