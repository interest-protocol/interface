import { MAILMarketPoolOperation } from './../../mail-market-pool.types';
export interface MAILMarketPoolTableProps {
  favorite?: boolean;
  type: MAILMarketPoolOperation;
}

export interface MAILMarketPoolModalProps {
  address: string;
  type: MAILMarketPoolOperation;
}
