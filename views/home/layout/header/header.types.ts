import { ReactNode } from 'react';

export interface HeaderProps {
  empty?: boolean;
}

export interface MenuListProps {
  id?: string;
}

export interface MenuItemProps extends MenuListProps {
  title: string;
  link?: string;
  data?: ReactNode;
  isDropdown?: boolean;
}
