import { FC, SVGAttributes } from 'react';
import { Control, UseFormRegister } from 'react-hook-form';

export interface IMailMarketData {
  name: string;
  symbol: string;
  Icon: FC<SVGAttributes<SVGSVGElement>>;
  address: string;
  currenciesCost: ReadonlyArray<[string, string]>;
}

export interface IMAILMarketForm {
  search: string;
}

export type TMailMarketData = ReadonlyArray<IMailMarketData>;

export type TMailMarketDefaultData = ReadonlyArray<
  Omit<IMailMarketData, 'currenciesCost'>
>;

export interface MAILMarketSearchInputProps {
  register: UseFormRegister<IMAILMarketForm>;
}

export interface MAILMarketTableProps {
  popular?: boolean;
  control: Control<IMAILMarketForm>;
}
