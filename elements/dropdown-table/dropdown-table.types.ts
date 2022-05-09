import { ReactNode } from 'react';

interface ITableHeading {
  tip?: string;
  item: ReactNode;
}

export interface DropdownTableCellProps {
  as: 'td' | 'th';
  tip?: string;
}

type TItems = ReadonlyArray<ReactNode>;

interface IRow {
  items: TItems;
  dropdown?: ReactNode;
  sideContent?: ReactNode;
}

export interface DropdownTableProps {
  ordinate?: boolean;
  data: ReadonlyArray<IRow>;
  headings: ReadonlyArray<ITableHeading>;
}

export interface DropdownTableRowProps {
  items: TItems;
  index?: number;
  ordinate?: boolean;
  dropdown: ReactNode;
  sideContent?: ReactNode;
  headings: ReadonlyArray<ITableHeading>;
}
