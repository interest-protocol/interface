import { FC, SVGAttributes } from 'react';
import { Control, UseFormRegister } from 'react-hook-form';

export interface IMailMarketData {
  name: string;
  symbol: string;
  address: string;
  Icon?: FC<SVGAttributes<SVGSVGElement>>;
  currenciesCost: ReadonlyArray<[string, string]>;
}

export interface IMAILMarketForm {
  search: string;
}

export type TMailMarketData = ReadonlyArray<IMailMarketData>;

export type TMailMarketDefaultData = ReadonlyArray<
  Omit<IMailMarketData, 'currenciesCost'>
>;

export interface MAILMarketSearchBarProps {
  register: UseFormRegister<IMAILMarketForm>;
  control: Control<IMAILMarketForm>;
  localAssets: ReadonlyArray<Omit<IMailMarketData, 'Icon' | 'currenciesCost'>>;
  setLocalAssets: (
    localAssets: ReadonlyArray<Omit<IMailMarketData, 'Icon' | 'currenciesCost'>>
  ) => void;
}
export interface MAILMarketSearchBarResultsProps {
  control: Control<IMAILMarketForm>;
  localAssets: ReadonlyArray<Omit<IMailMarketData, 'Icon' | 'currenciesCost'>>;
  setLocalAssets: (
    localAssets: ReadonlyArray<Omit<IMailMarketData, 'Icon' | 'currenciesCost'>>
  ) => void;
}

export interface MAILMarketTableProps {
  favorite?: boolean;
  control: Control<IMAILMarketForm>;
  localAssets: ReadonlyArray<Omit<IMailMarketData, 'Icon' | 'currenciesCost'>>;
  setLocalAssets: (
    localAssets: ReadonlyArray<Omit<IMailMarketData, 'Icon' | 'currenciesCost'>>
  ) => void;
}

export interface MAILMarketTableItemProps extends IMailMarketData {
  localAssets: ReadonlyArray<Omit<IMailMarketData, 'Icon' | 'currenciesCost'>>;
  setLocalAssets: (
    localAssets: ReadonlyArray<Omit<IMailMarketData, 'Icon' | 'currenciesCost'>>
  ) => void;
  data: TMailMarketData;
}

export interface IMailMarketSearchItemData {
  name: string;
  symbol: string;
  address: string;
  existent: boolean;
  localAssets: ReadonlyArray<Omit<IMailMarketData, 'Icon' | 'currenciesCost'>>;
  setLocalAssets: (
    localAssets: ReadonlyArray<Omit<IMailMarketData, 'Icon' | 'currenciesCost'>>
  ) => void;
}
