import { ReactNode } from 'react';
import { Control, UseFormRegister } from 'react-hook-form';

export interface IToken {
  name?: string;
  symbol: string;
  address: string;
}

export interface SwapHeaderProps {
  description: string;
}

export interface SwapModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export interface ISwapForm {
  value: number;
  currency: string;
}

export interface SwapSelectCurrencyProps {
  local?: boolean;
  defaultValue: string;
  label?: string;
  tokens: ReadonlyArray<IToken>;
  onSelectCurrency: (currency: string) => void;
}

export interface SwapFormProps {
  local?: {
    setLocalTokens: (
      token: ReadonlyArray<{
        name: string;
        symbol: string;
        address: string;
      }>
    ) => void;
  };
  tokens: ReadonlyArray<IToken>;
}

export interface SwapProps {
  customAction: () => void;
}

export interface CurrencyIdentifierProps {
  control: Control<ISwapForm>;
}
export interface SwapCurrencyDropdownProps {
  local?: boolean;
  Input: ReactNode;
  defaultValue: string;
  tokens: ReadonlyArray<IToken>;
  control: Control<{ search: string }>;
  onSelectCurrency: (currency: string) => void;
}

export interface SwapSearchTokenProps {
  register: UseFormRegister<{ search: string }>;
}
