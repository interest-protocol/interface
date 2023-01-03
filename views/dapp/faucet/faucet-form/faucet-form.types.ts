import { FC } from 'react';
import { Control, UseFormGetValues } from 'react-hook-form';

import { SVGProps } from '@/components/svg/svg.types';

import { IFaucetForm, IToken, RemoveLocalToken } from '../faucet.types';

export interface FaucetFormProps {
  isLoadingData?: boolean;
  removeLocalToken?: RemoveLocalToken;
  tokens: ReadonlyArray<IToken>;
  refetch?: () => Promise<void>;
}

export interface FaucetSelectCurrencyProps {
  label: string;
  defaultValue: string;
  tokens: ReadonlyArray<IToken>;
  onSelectCurrency: (currency: string, callback?: () => void) => void;
}

export interface CurrencyIdentifierProps {
  control: Control<IFaucetForm>;
  tokens: ReadonlyArray<IToken>;
  chainId: number;
}

export interface MintButtonProps {
  control?: Control<IFaucetForm>;
  getValues: UseFormGetValues<IFaucetForm>;
  refetch?: () => Promise<void>;
}

export interface ItemBalanceProps {
  SVG: FC<SVGProps>;
  objectNumbers: number;
  symbol: string;
  totalBalance: string;
}
