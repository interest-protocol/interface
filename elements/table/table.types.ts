import { ReactNode } from 'react';

export interface ResponsiveTableProps {
  loading?: boolean;
  ordinate?: boolean;
  mobileSide?: ReactNode;
  headings: ReadonlyArray<ReactNode>;
  data: ReadonlyArray<ReadonlyArray<ReactNode>>;
}

export interface TableLoadingProps {
  columns: number;
}
