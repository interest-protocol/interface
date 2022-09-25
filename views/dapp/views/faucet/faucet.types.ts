import { BigNumber } from 'ethers';
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
  defaultValue: string;
  tokens: ReadonlyArray<IToken>;
  onSelectCurrency: (currency: string, callback?: () => void) => void;
}

export interface FaucetFormProps {
  isLoadingData?: boolean;
  removeLocalToken?: RemoveLocalToken;
  tokens: ReadonlyArray<IToken & { balance: BigNumber }>;
}

export interface FaucetProps {
  customAction: () => void;
}

export interface CurrencyIdentifierProps {
  control: Control<IFaucetForm>;
  tokens: ReadonlyArray<IToken & { balance: BigNumber }>;
  chainId: number;
}
export interface FaucetCurrencyDropdownProps {
  defaultValue: string;
  tokens: ReadonlyArray<IToken>;
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
