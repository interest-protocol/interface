import { TOKEN_SYMBOL } from '@/sdk';

export interface MAILMarketPoolModalProps {
  isOpen: boolean;
  address: string;
  handleClose: () => void;
  type: 'borrow' | 'supply';
}

export interface IMAILMarketPoolForm {
  value: number;
  currency: TOKEN_SYMBOL;
}
