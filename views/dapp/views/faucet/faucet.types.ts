export interface IToken {
  name: string;
  symbol: string;
  address: string;
}

export interface FaucetCurrencyDropdownProps {
  defaultValue: string;
  tokens: ReadonlyArray<IToken>;
  onSelectCurrency: (currency: string) => void;
}
export type AddLocalToken = (item: IToken) => void;

export type RemoveLocalToken = (address: string) => void;

export interface IFaucetForm {
  amount: number;
  token: string;
}
