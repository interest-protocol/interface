import { ReactNode } from 'react';

export interface ResponsiveTableProps {
  loading?: boolean;
  ordinate?: boolean;
  hasButton?: boolean;
  headings: ReadonlyArray<{ tip?: string; item: ReactNode }>;
  data: ReadonlyArray<{
    button?: ReactNode;
    mobileSide?: ReactNode;
    items: ReadonlyArray<ReactNode>;
    Dropdown?: ReactNode;
  }>;
}

export interface TableLoadingProps {
  columns: number;
}
