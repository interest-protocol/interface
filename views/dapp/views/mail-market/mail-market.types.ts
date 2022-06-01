import { Control, UseFormRegister } from 'react-hook-form';

import { LocalMAILMarketData, MailMarketsSummaryData } from '@/interface';

export interface IMAILMarketForm {
  search: string;
}

export interface MAILMarketSearchBarProps {
  register: UseFormRegister<IMAILMarketForm>;
  control: Control<IMAILMarketForm>;
  allMarkets: ReadonlyArray<MailMarketsSummaryData>;
  addLocalAsset: AddLocalAsset;
}

export interface MAILMarketSearchBarResultsProps {
  control: Control<IMAILMarketForm>;
  allMarkets: MAILMarketSearchBarProps['allMarkets'];
  addLocalAsset: MAILMarketSearchBarProps['addLocalAsset'];
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
  address: string;
  addLocalAsset: MAILMarketSearchBarProps['addLocalAsset'];
}

export type AddLocalAsset = (item: LocalMAILMarketData) => void;
