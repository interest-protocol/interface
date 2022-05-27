import { FC, SVGAttributes } from 'react';
import { Control, UseFormRegister } from 'react-hook-form';

export type MAILMarketPoolOperation = 'supply' | 'borrow';

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

export type IMailMarketPoolTypeData = Record<
  MAILMarketPoolOperation,
  ReadonlyArray<IMailMarketPoolData>
>;

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

export interface MAILMarketLoadingProps {
  loading: boolean;
}
