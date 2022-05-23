import { FC, SVGAttributes } from 'react';
import { Control, UseFormRegister } from 'react-hook-form';

export interface IMailMarketPoolData {
  apr: number;
  name: string;
  symbol: string;
  address: string;
  Icon: FC<SVGAttributes<SVGSVGElement>>;
}

export interface IMAILMarketForm {
  search: string;
}

export interface IMailMarketPoolTypeData {
  supply: ReadonlyArray<IMailMarketPoolData>;
  borrow: ReadonlyArray<IMailMarketPoolData>;
}

export interface MAILMarketSearchInputProps {
  register: UseFormRegister<IMAILMarketForm>;
}

export interface MAILMarketTableProps {
  popular?: boolean;
  control: Control<IMAILMarketForm>;
}

export interface MAILMarketPoolProps {
  pool: string;
}
