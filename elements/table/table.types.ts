import { ReactNode } from 'react';

interface IHeading {
  tip?: string;
  item: ReactNode;
}

type TItems = ReadonlyArray<ReactNode>;

interface IRow {
  items: TItems;
  button?: ReactNode;
  mobileSide?: ReactNode;
}
export interface ResponsiveTableProps {
  loading?: boolean;
  ordinate?: boolean;
  hasButton?: boolean;
  data: ReadonlyArray<IRow>;
  headings: ReadonlyArray<IHeading>;
}

export interface TableRowProps {
  index: number;
  items: TItems;
  button: ReactNode;
  ordinate?: boolean;
  hasButton: boolean;
  mobileSide: ReactNode;
  headings: ReadonlyArray<IHeading>;
}

export interface TableLoadingProps {
  columns: number;
}
