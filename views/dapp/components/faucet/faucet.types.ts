import { TOKEN_SYMBOL } from '@/constants/erc-20.data';

export interface FaucetModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export interface IFaucetForm {
  value: number;
  currency: string;
}

export interface FaucetSelectCurrencyProps {
  onSelectCurrency: (currency: TOKEN_SYMBOL) => void;
}
