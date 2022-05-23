export interface MAILMarketPoolTableProps {
  favorite?: boolean;
  type: 'borrow' | 'supply';
}

export interface MAILMarketPoolModalProps {
  address: string;
  type: 'borrow' | 'supply';
}
