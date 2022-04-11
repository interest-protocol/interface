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
    dropdown?: {
      node: ReactNode;
      isOpen: boolean;
      onOpen: () => void;
      onClose: () => void;
    };
  }>;
}

export interface TableLoadingProps {
  columns: number;
}
