import { Control, UseFormRegister } from 'react-hook-form';

import { LocalMAILMarketData, MailMarketsSummaryData } from '@/interface';

export interface IMAILMarketForm {
  search: string;
}

export interface MAILMarketSearchBarProps {
  register: UseFormRegister<IMAILMarketForm>;
  control: Control<IMAILMarketForm>;
  localAssets: ReadonlyArray<LocalMAILMarketData>;
  setLocalAssets: (localAssets: ReadonlyArray<LocalMAILMarketData>) => void;
}

export interface MAILMarketSearchBarResultsProps {
  control: Control<IMAILMarketForm>;
  localAssets: ReadonlyArray<LocalMAILMarketData>;
  setLocalAssets: (localAssets: ReadonlyArray<LocalMAILMarketData>) => void;
}

export interface MAILMarketTableProps {
  favorite?: boolean;
  control: Control<IMAILMarketForm>;
  localAssets: ReadonlyArray<LocalMAILMarketData>;
  setLocalAssets: (localAssets: ReadonlyArray<LocalMAILMarketData>) => void;
  data: ReadonlyArray<MailMarketsSummaryData>;
}

export interface MAILMarketTableItemProps {
  localAssets: ReadonlyArray<LocalMAILMarketData>;
  setLocalAssets: (localAssets: ReadonlyArray<LocalMAILMarketData>) => void;
  data: MailMarketsSummaryData;
}

export interface IMailMarketSearchItemData {
  name: string;
  symbol: string;
  address: string;
  existent: boolean;
  localAssets: ReadonlyArray<LocalMAILMarketData>;
  setLocalAssets: (localAssets: ReadonlyArray<LocalMAILMarketData>) => void;
}
