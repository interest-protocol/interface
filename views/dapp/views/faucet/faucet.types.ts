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
  local?: {
    addLocalToken: AddLocalToken;
  };
  defaultValue: string;
  tokens: ReadonlyArray<IToken>;
  onSelectCurrency: (currency: string) => void;
}

export interface FaucetFormProps {
  local?: {
    addLocalToken: AddLocalToken;
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
  local?: {
    addLocalToken: AddLocalToken;
  };
  Input: ReactNode;
  defaultValue: string;
  tokens: ReadonlyArray<IToken>;
  control: Control<{ search: string }>;
  onSelectCurrency: (currency: string, addLocalToken?: () => void) => void;
}
export type AddLocalToken = (item: IToken) => void;

export interface FaucetSearchTokenProps {
  register: UseFormRegister<{ search: string }>;
}
