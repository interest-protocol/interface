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
  chainId: number;
}

export interface MAILMarketSearchBarResultsProps {
  control: Control<IMAILMarketForm>;
  allMarkets: MAILMarketSearchBarProps['allMarkets'];
  addLocalAsset: MAILMarketSearchBarProps['addLocalAsset'];
  chainId: MAILMarketSearchBarProps['chainId'];
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

export interface SearchItemWrapperProps {
  address: string;
  addLocalAsset: MAILMarketSearchBarProps['addLocalAsset'];
}

export interface SearchItemProps {
  address: SearchItemWrapperProps['address'];
  addLocalAsset: SearchItemWrapperProps['addLocalAsset'];
  data: [boolean, string, string, string, string];
}

export type AddLocalAsset = (item: LocalMAILMarketData) => void;
