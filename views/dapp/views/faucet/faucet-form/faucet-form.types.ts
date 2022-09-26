import { BigNumber } from 'ethers';
import { Control, UseFormGetValues } from 'react-hook-form';

import { IFaucetForm, IToken, RemoveLocalToken } from '../faucet.types';

export interface FaucetFormProps {
  isLoadingData?: boolean;
  removeLocalToken?: RemoveLocalToken;
  tokens: ReadonlyArray<IToken & { balance: BigNumber }>;
  refetch: () => Promise<void>;
}

export interface FaucetSelectCurrencyProps {
  label: string;
  defaultValue: string;
  tokens: ReadonlyArray<IToken>;
  onSelectCurrency: (currency: string, callback?: () => void) => void;
}

export interface CurrencyIdentifierProps {
  control: Control<IFaucetForm>;
  tokens: ReadonlyArray<IToken & { balance: BigNumber }>;
  chainId: number;
}

export interface MintButtonProps {
  control: Control<IFaucetForm>;
  chainId: number;
  account: string;
  getValues: UseFormGetValues<IFaucetForm>;
  refetch: () => Promise<void>;
}
