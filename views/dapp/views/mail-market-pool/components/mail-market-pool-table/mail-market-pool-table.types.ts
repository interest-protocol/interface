import { MAILMarketLoadingProps } from '../../mail-market-pool.types';
import { MAILMarketPoolOperation } from './../../mail-market-pool.types';
export interface MAILMarketPoolTableProps extends MAILMarketLoadingProps {
  favorite?: boolean;
  type: MAILMarketPoolOperation;
}

export interface MAILMarketPoolModalProps {
  address: string;
  type: MAILMarketPoolOperation;
}
