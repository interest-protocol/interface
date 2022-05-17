import { Control, UseFormRegister } from 'react-hook-form';

export interface IMailMarketData {
  name: string;
  symbol: string;
  imgUrl: string;
  address: string;
  currenciesCost: ReadonlyArray<[string, string]>;
}

export interface IMAILMarketForm {
  search: string;
}

export type TMailMarketData = ReadonlyArray<IMailMarketData>;

export interface MAILMarketSearchInputProps {
  register: UseFormRegister<IMAILMarketForm>;
}

export interface MAILMarketTableProps {
  popular?: boolean;
  control: Control<IMAILMarketForm>;
}
