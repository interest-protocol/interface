import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

export interface IToken {
  name: string;
  symbol: string;
  address: string;
  Icon: FC<SVGProps>;
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
