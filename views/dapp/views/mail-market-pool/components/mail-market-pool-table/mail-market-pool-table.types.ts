import { MailDataStructOutput } from '../../../../../../types/ethers-contracts/InterestViewMAILAbi';
import {
  MAILMarketLoadingProps,
  MarketMetadata,
  TotalBorrowRiskyInUSDRecord,
} from '../../mail-market-pool.types';
import { MAILMarketPoolOperation } from './../../mail-market-pool.types';

export interface MAILMarketPoolTableProps extends MAILMarketLoadingProps {
  active?: boolean;
  type: MAILMarketPoolOperation;
  markets: ReadonlyArray<MailDataStructOutput & MarketMetadata>;
  totalBorrowsInUSDRecord: TotalBorrowRiskyInUSDRecord;
  pool: string;
  refreshData: () => Promise<void>;
}

export interface MAILMarketPoolModalProps {
  address: string;
  type: MAILMarketPoolOperation;
}
