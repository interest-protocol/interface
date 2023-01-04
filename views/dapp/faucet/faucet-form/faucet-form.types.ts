import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { Control, UseFormGetValues } from 'react-hook-form';

import { SVGProps } from '@/components/svg/svg.types';

import { IFaucetForm, IToken } from '../faucet.types';

export interface FaucetSelectCurrencyProps {
  label: string;
  defaultValue: string;
  tokens: ReadonlyArray<IToken>;
  onSelectCurrency: (currency: string, callback?: () => void) => void;
}

export interface MintButtonProps {
  getValues: UseFormGetValues<IFaucetForm>;
}

interface ObjectData {
  id: string;
  balance: string;
}

export interface ItemBalanceProps {
  SVG: FC<SVGProps>;
  objectsData: ReadonlyArray<ObjectData>;
  symbol: string;
  totalBalance: BigNumber;
  decimals: number;
}
