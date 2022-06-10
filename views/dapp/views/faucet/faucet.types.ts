import { BigNumber } from 'ethers';
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
  onSelectCurrency: (currency: string, callback?: () => void) => void;
}

export interface FaucetFormProps {
  isLoadingData?: boolean;
  addLocalToken?: AddLocalToken;
  removeLocalToken?: RemoveLocalToken;
  tokens: ReadonlyArray<IToken & { balance: BigNumber }>;
}

export interface FaucetSelectCurrencyForm {
  search: string;
}

export interface FaucetProps {
  customAction: () => void;
}

export interface CurrencyIdentifierProps {
  control: Control<IFaucetForm>;
  tokens: ReadonlyArray<IToken & { balance: BigNumber }>;
}
export interface FaucetCurrencyDropdownProps {
  addLocalToken?: AddLocalToken;
  Input: ReactNode;
  defaultValue: string;
  tokens: ReadonlyArray<IToken>;
  control: Control<{ search: string }>;
  onSelectCurrency: (currency: string) => void;
}
export type AddLocalToken = (item: IToken) => void;

export type RemoveLocalToken = (address: string) => void;

export interface FaucetSearchTokenProps {
  register: UseFormRegister<{ search: string }>;
}

export interface CreateTokenFormProps {
  handleClose: () => void;
  addLocalToken: AddLocalToken;
}
