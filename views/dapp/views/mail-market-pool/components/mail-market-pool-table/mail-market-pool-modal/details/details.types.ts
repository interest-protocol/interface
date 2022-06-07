import { Control } from 'react-hook-form';

import { IMAILMarketPoolForm } from '@/views/dapp/views/mail-market-pool/components/mail-market-pool-table/mail-market-pool-modal/mail-market-pool-modal.types';
import {
  MarketMetadata,
  TotalBorrowRiskyInUSDRecord,
} from '@/views/dapp/views/mail-market-pool/mail-market-pool.types';

import { MailDataStructOutput } from '../../../../../../../../types/ethers-contracts/InterestViewMAILAbi';

export interface DetailsProps {
  type: 'borrow' | 'supply';
  data: MailDataStructOutput & MarketMetadata;
  control: Control<IMAILMarketPoolForm>;
  base: boolean;
  totalBorrowsInUSDRecord: TotalBorrowRiskyInUSDRecord;
}
