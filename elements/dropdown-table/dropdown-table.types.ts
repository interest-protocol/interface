/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode } from 'react';

interface ITableHeading {
  tip?: string;
  item: ReactNode;
}

export interface DropdownTableCellProps {
  as: 'td' | 'th';
  tip?: string;
}

type TItems = ReadonlyArray<ReactNode>;

interface IDropdown {
  args: any;
  Component: FC<any>;
}

interface IRow {
  items: TItems;
  sideContent?: ReactNode;
  dropdown?: IDropdown;
}

export interface DropdownTableProps {
  ordinate?: boolean;
  isDesktop?: boolean;
  data: ReadonlyArray<IRow>;
  headings: ReadonlyArray<ITableHeading>;
  changeColor?: ReadonlyArray<boolean>;
}

export interface DropdownTableRowProps {
  items: TItems;
  index?: number;
  ordinate?: boolean;
  isDesktop?: boolean;
  dropdown: IDropdown;
  sideContent?: ReactNode;
  headings: ReadonlyArray<ITableHeading>;
  setColor?: boolean;
}
