import { ReactNode } from 'react';
import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';

export enum Volatility {
  Auto,
  Stable,
  Volatile,
}

export interface LocalSwapSettings {
  slippage: number; // 20 equals 20%
  volatility: Volatility;
  deadline: number; // minutes
}

export interface SwapTokenModalMetadata {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  chainId?: number;
}

export interface SwapHeaderProps {
  description: string;
}

export interface SwapModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export interface SwapFormTokenData {
  value: string;
  address: string;
}

export interface ISwapForm {
  slippage: number;
  deadline: number;
  tokenIn: SwapFormTokenData;
  tokenOut: SwapFormTokenData;
  volatility: Volatility;
}

export interface SwapSelectCurrencyProps {
  label?: string;
  fromRight?: boolean;
  currentToken: string;
  onSelectCurrency: (currency: string) => void;
}

export interface SwapFormProps {
  control: Control<ISwapForm>;
  register: UseFormRegister<ISwapForm>;
  setValue: UseFormSetValue<ISwapForm>;
}

export interface SwapProps {
  customAction: () => void;
}

export interface CurrencyIdentifierProps {
  control: Control<ISwapForm>;
}

export interface SwapCurrencyDropdownProps {
  Input: ReactNode;
  fromRight?: boolean;
  currentToken: string;
  control: Control<{ search: string }>;
  onSelectCurrency: (currency: string) => void;
}

export interface SwapSearchTokenProps {
  register: UseFormRegister<{ search: string }>;
}
