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
  autoFetch: boolean; // minutes
}

export interface AmountCacheValue {
  timestamp: number;
  amountOut: string;
}

export interface SwapButtonProps {
  disabled: boolean;
  fetchingAmount: boolean;
  fetchingBaseData: boolean;
  fetchingBalancesData: boolean;
  tokenInAddress: string;
  getValues: UseFormGetValues<ISwapForm>;
  setSwapBase: Dispatch<SetStateAction<string | null>>;
  account: string;
  chainId: number;
  updateBalances: () => Promise<void>;
  parsedTokenInBalance: BigNumber;
  swapBase: string | null;
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
  onClick: () => void;
  loadingText: string | null;
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
