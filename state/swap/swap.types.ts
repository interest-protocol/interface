import { PairType } from '@/constants';

export interface SwapState {
  tokenIn: string;
  tokenOut: string;
  isSwapping: boolean;
  isFetchingOutputAmount: boolean;
  tokenInAmount: string;
  tokenOutAmount: string;
  priceImpact: number;
  swapError: string;
  fetchingOutPutError: string;
  tradeType: 'auto' | PairType.Volatile | PairType.Stable;
}

export interface SetTokenAmountData {
  amount: string;
  token: string;
}

export interface SetInitialData {
  tokenIn: string;
  tokenOut: string;
  chainId: number;
  account: string;
}
