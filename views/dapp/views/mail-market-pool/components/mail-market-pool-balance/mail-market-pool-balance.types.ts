import { MAILMarketLoadingProps } from '../../mail-market-pool.types';

export interface MAILMarketPoolBalanceProps extends MAILMarketLoadingProps {
  type: 'supply' | 'borrow';
  balance: string;
}
