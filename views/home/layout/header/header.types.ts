import { ReactNode } from 'react';

export interface HeaderProps {
  empty?: boolean;
}
export interface MenuItemProps {
  title: string;
  link?: string;
  data?: ReactNode;
  isDropdown?: boolean;
}
