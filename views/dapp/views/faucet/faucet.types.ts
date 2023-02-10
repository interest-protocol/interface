export interface IToken {
  name: string;
  symbol: string;
  address: `0x${string}`;
}

export interface FaucetCurrencyDropdownProps {
  defaultValue: string;
  tokens: ReadonlyArray<IToken>;
  onSelectCurrency: (currency: `0x${string}`) => void;
}
export type AddLocalToken = (item: IToken) => void;

export type RemoveLocalToken = (address: string) => void;

export interface IFaucetForm {
  amount: number;
  token: `0x${string}`;
}
