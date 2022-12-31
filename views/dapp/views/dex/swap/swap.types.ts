import { Dispatch, FC, SetStateAction } from 'react';
import { Control, UseFormGetValues, UseFormSetValue } from 'react-hook-form';

import { SVGProps } from '@/components/svg/svg.types';
import { SwapFormTokenData } from '@/views/dapp/views/dex/dex.types';

export interface ISwapForm {
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
  swapBase: string | null;
  needsApproval: boolean;
  control: Control<ISwapForm>;
}

export interface SwapManagerProps {
  isFetchingAmountOutTokenOut: boolean;
  isFetchingAmountOutTokenIn: boolean;
  hasNoMarket: boolean;
  setValue: UseFormSetValue<ISwapForm>;
  setFetchingAmountOutTokenOut: Dispatch<SetStateAction<boolean>>;
  setFetchingAmountOutTokenIn: Dispatch<SetStateAction<boolean>>;
  setHasNoMarket?: Dispatch<SetStateAction<boolean>>;
  setAmountOutError?: Dispatch<SetStateAction<string | null>>;
  setSwapBase?: Dispatch<SetStateAction<string | null>>;
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
  Icon: FC<SVGProps>;
}

export interface UseSwapArgs {
  localSettings: LocalSwapSettings;
  parsedTokenInBalance: any;
  swapBase: any;
  tokenIn: SwapFormTokenData;
  tokenOut: SwapFormTokenData;
  account: string;
  chainId: number;
  needsApproval: boolean;
}

export interface UseWETHDepositArgs {
  chainId: number;
  tokenIn: SwapFormTokenData;
  tokenOut: SwapFormTokenData;
  parsedTokenInBalance: any;
  needsApproval: boolean;
}

export interface UseWETHWithdrawArgs {
  chainId: number;
  tokenIn: SwapFormTokenData;
  tokenOut: SwapFormTokenData;
  parsedTokenInBalance: any;
  needsApproval: boolean;
}
