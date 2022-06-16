import { ReactNode } from 'react';
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

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

export interface ICurrencyField {
  value: number;
  address: string;
}

export interface ISwapForm {
  slippage: number;
  deadline: number;
  origin: ICurrencyField;
  target: ICurrencyField;
}

export interface SwapSelectCurrencyProps {
  label?: string;
  fromRight?: boolean;
  defaultValue: string;
  tokens: ReadonlyArray<IToken>;
  onSelectCurrency: (currency: string) => void;
}

export interface SwapFormProps {
  control: Control<ISwapForm>;
  tokens: ReadonlyArray<IToken>;
  register: UseFormRegister<ISwapForm>;
  setValue: UseFormSetValue<ISwapForm>;
  getValues: UseFormGetValues<ISwapForm>;
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
  defaultValue: string;
  tokens: ReadonlyArray<IToken>;
  control: Control<{ search: string }>;
  onSelectCurrency: (currency: string) => void;
}

export interface SwapSearchTokenProps {
  register: UseFormRegister<{ search: string }>;
}
