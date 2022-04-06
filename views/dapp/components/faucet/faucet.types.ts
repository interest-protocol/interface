import { TOKEN_SYMBOL } from '@/constants/erc-20.data';

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
