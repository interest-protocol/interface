import { Dispatch, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';

export interface IToken {
  name: string;
  symbol: string;
  address: `0x${string}`;
}

export interface FaucetCurrencyDropdownProps {
  defaultValue: string;
  tokens: ReadonlyArray<IToken>;
  onSelectCurrency: (currency: `0x${string}`) => void;
  chainId: number;
}
export type AddLocalToken = (item: IToken) => void;

export type RemoveLocalToken = (address: string) => void;

export interface IFaucetForm {
  amount: number;
  token: `0x${string}`;
}

export interface FaucetProps {
  formFaucet: UseFormReturn<IFaucetForm>;
  formLocalFaucet: UseFormReturn<IFaucetForm>;

  isCreatingTokenState: {
    isCreatingToken: boolean;
    setIsCreatingToken: Dispatch<SetStateAction<boolean>>;
  };
}
