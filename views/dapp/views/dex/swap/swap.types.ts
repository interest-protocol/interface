import { BigNumber } from 'ethers';
import { Dispatch, FC, SetStateAction, SVGAttributes } from 'react';
import { Control, UseFormGetValues, UseFormSetValue } from 'react-hook-form';

import { SwapFormTokenData } from '@/views/dapp/views/dex/dex.types';

export interface ISwapForm {
  slippage: string;
  deadline: number;
  tokenIn: SwapFormTokenData;
  tokenOut: SwapFormTokenData;
}

export interface LocalSwapSettings {
  slippage: string; // 20 equals 20%
  deadline: number; // minutes
}

export interface AmountCacheValue {
  timestamp: number;
  amountOut: string;
}

export interface BalancesData {
  tokenInBalance: BigNumber;
  tokenOutBalance: BigNumber;
  tokenInAllowance: BigNumber;
  tokenOutAllowance: BigNumber;
}

export interface SwapButtonProps {
  disabled: boolean;
  tokenInAddress: string;
  getValues: UseFormGetValues<ISwapForm>;
  setSwapBase: Dispatch<SetStateAction<string | null>>;
  account: string;
  chainId: number;
  updateBalances: () => Promise<void>;
  parsedTokenInBalance: BigNumber;
  swapBase: string | null;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  needsApproval: boolean;
  control: Control<ISwapForm>;
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
  loading: boolean;
  onClick: () => void;
  loadingText: string;
  text: string;
}

export interface OnSelectCurrencyData {
  address: string;
  symbol: string;
  decimals: number;
}

export interface SwapMessageProps {
  color?: string;
  message: string;
  Icon: FC<SVGAttributes<SVGSVGElement>>;
}
