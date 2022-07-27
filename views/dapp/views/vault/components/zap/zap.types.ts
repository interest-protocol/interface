import { TOKEN_SYMBOL } from '@/sdk';
import { ReactNode } from 'react';

export interface ZapModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export interface ZapProps {
  customAction?: () => void;
}
export interface IZapForm {
  value: number;
  currency: TOKEN_SYMBOL;
}

export interface ZapInputSelectCurrencyProps {
  defaultValue: TOKEN_SYMBOL;
  onSelectCurrency: (currency: TOKEN_SYMBOL) => void;
}

export interface ZapSelectCurrencyProps {
  label: ReactNode;
  defaultValue: string;
  tokens: ReadonlyArray<IToken>;
  onSelectCurrency: (currency: TOKEN_SYMBOL, callback?: () => void) => void;
}

export interface IToken {
  name: string;
  symbol: string;
  address: string;
}

export interface ZapCurrencyDropdownProps {
  defaultValue: string;
  tokens: ReadonlyArray<IToken>;
  onSelectCurrency: (
    currency: string | TOKEN_SYMBOL,
    callback?: () => void
  ) => void;
}
