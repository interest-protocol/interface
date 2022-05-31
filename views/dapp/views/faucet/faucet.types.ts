import { ReactNode } from 'react';
import { Control, UseFormRegister } from 'react-hook-form';

export interface IToken {
  name?: string;
  symbol: string;
  address: string;
}

export interface FaucetModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export interface IFaucetForm {
  value: number;
  currency: string;
}

export interface FaucetSelectCurrencyProps {
  label: string;
  local?: boolean;
  defaultValue: string;
  tokens: ReadonlyArray<IToken>;
  onSelectCurrency: (currency: string) => void;
}

export interface FaucetFormProps {
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

export interface FaucetProps {
  customAction: () => void;
}

export interface CurrencyIdentifierProps {
  control: Control<IFaucetForm>;
}
export interface FaucetCurrencyDropdownProps {
  local?: boolean;
  Input: ReactNode;
  defaultValue: string;
  tokens: ReadonlyArray<IToken>;
  control: Control<{ search: string }>;
  onSelectCurrency: (currency: string) => void;
}

export interface FaucetSearchTokenProps {
  register: UseFormRegister<{ search: string }>;
}
