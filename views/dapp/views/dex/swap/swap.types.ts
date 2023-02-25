import { BigNumber } from 'ethers';
import { Dispatch, FC, SetStateAction } from 'react';
import { Control, UseFormGetValues, UseFormSetValue } from 'react-hook-form';

import { SVGProps } from '@/components/svg/svg.types';
import { Address } from '@/interface';
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
  tokenInAddress: `0x${string}`;
  setValue: UseFormSetValue<ISwapForm>;
  getValues: UseFormGetValues<ISwapForm>;
  setSwapBase: Dispatch<SetStateAction<Address | null>>;
  account: string;
  chainId: number;
  localSettings: LocalSwapSettings;
  parsedTokenInBalance: BigNumber;
  swapBase: Address | null;
  needsApproval: boolean;
  control: Control<ISwapForm>;
  refetch: () => Promise<void>;
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
  setSwapBase: Dispatch<SetStateAction<Address | null>>;
}

export interface SwapViewButtonProps {
  disabled: boolean;
  onClick: () => void;
  loadingText: string | null;
  text: string;
}

export interface OnSelectCurrencyData {
  address: `0x${string}`;
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
  parsedTokenInBalance: SwapButtonProps['parsedTokenInBalance'];
  swapBase: SwapButtonProps['swapBase'];
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
  parsedTokenInBalance: SwapButtonProps['parsedTokenInBalance'];
  needsApproval: boolean;
}

export interface UseWETHWithdrawArgs {
  chainId: number;
  tokenIn: SwapFormTokenData;
  tokenOut: SwapFormTokenData;
  parsedTokenInBalance: SwapButtonProps['parsedTokenInBalance'];
  needsApproval: boolean;
}
