import { ReactNode } from 'react';

export interface ResponsiveTableProps {
  loading?: boolean;
  ordinate?: boolean;
  hasButton?: boolean;
  mobileSide?: ReactNode;
  headings: ReadonlyArray<{ tip?: string; item: ReactNode }>;
  data: ReadonlyArray<{ button?: ReactNode; items: ReadonlyArray<ReactNode> }>;
}

export interface TableLoadingProps {
  columns: number;
}
