import { ReactNode } from 'react';
import { Control, UseFormRegister } from 'react-hook-form';

export interface IToken {
  name: string;
  symbol: string;
  address: string;
}

export interface FaucetModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export interface IFaucetForm {
  amount: number;
  token: string;
}

export interface FaucetSelectCurrencyProps {
  label: string;
  addLocalToken?: AddLocalToken;
  defaultValue: string;
  tokens: ReadonlyArray<IToken>;
  onSelectCurrency: (currency: string) => void;
}

export interface FaucetFormProps {
  addLocalToken?: AddLocalToken;
  tokens: ReadonlyArray<IToken>;
}

export interface FaucetProps {
  customAction: () => void;
}

export interface CurrencyIdentifierProps {
  control: Control<IFaucetForm>;
  chainId: number;
}
export interface FaucetCurrencyDropdownProps {
  addLocalToken?: AddLocalToken;
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
