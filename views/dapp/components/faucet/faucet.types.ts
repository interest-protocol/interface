import { TOKEN_SYMBOL } from '@/sdk';

export interface FaucetModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export interface IFaucetForm {
  value: number;
  currency: TOKEN_SYMBOL;
}

export interface FaucetSelectCurrencyProps {
  defaultValue: TOKEN_SYMBOL;
  onSelectCurrency: (currency: TOKEN_SYMBOL) => void;
}

export interface FaucetProps {
  customAction?: () => void;
}
