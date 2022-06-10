import { MailDataStructOutput } from '../../../../../../../types/ethers-contracts/InterestViewMAILAbi';
import {
  MarketMetadata,
  TotalBorrowRiskyInUSDRecord,
} from '../../../mail-market-pool.types';

export interface MAILMarketPoolModalProps {
  data: (MailDataStructOutput & MarketMetadata) | null;
  handleClose: () => void;
  type: 'borrow' | 'supply';
  totalBorrowsInUSDRecord: TotalBorrowRiskyInUSDRecord;
  pool: string;
  refreshData: () => Promise<void>;
}

export interface IMAILMarketPoolForm {
  value: string;
}
