import { ReactNode } from 'react';

export interface IHeading {
  tip?: string;
  item: ReactNode;
}

type TItems = ReadonlyArray<ReactNode>;

interface IRow {
  items: TItems;
  button?: ReactNode;
  mobileSide?: ReactNode;
  handleClick?: () => void;
}

export interface ResponsiveTableProps {
  loading?: boolean;
  ordinate?: boolean;
  specialRowHover?: boolean;
  data: ReadonlyArray<IRow>;
  hasButton?: string | boolean;
  headings: ReadonlyArray<IHeading>;
}

export interface TableRowProps {
  index: number;
  items: TItems;
  button: ReactNode;
  ordinate?: boolean;
  hasButton: boolean;
  mobileSide: ReactNode;
  handleClick?: () => void;
  specialRowHover?: boolean;
  headings: ReadonlyArray<IHeading>;
}

export interface TableLoadingProps {
  columns: number;
}
