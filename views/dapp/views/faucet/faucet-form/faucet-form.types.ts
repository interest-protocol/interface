import { BigNumber } from 'ethers';
import { Dispatch, SetStateAction } from 'react';
import { Control, UseFormGetValues, UseFormReturn } from 'react-hook-form';

import { IFaucetForm, IToken, RemoveLocalToken } from '../faucet.types';

export interface FaucetFormProps {
  isLoadingData?: boolean;
  removeLocalToken?: RemoveLocalToken;
  tokens: ReadonlyArray<IToken & { balance: BigNumber }>;
  refetch: () => Promise<void>;
  formFaucet: UseFormReturn<IFaucetForm>;
  chainId: number;
  account: string;
}

export interface FaucetSelectCurrencyProps {
  chainId: number;
  label: string;
  defaultValue: string;
  tokens: ReadonlyArray<IToken>;
  onSelectCurrency: (currency: `0x${string}`, callback?: () => void) => void;
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
