import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface IDropdownData {
  value: string;
  disabled?: boolean;
  noSelectable?: boolean;
  onSelect?: () => void;
  displayTitle?: ReactNode;
  displayOption: ReactNode;
}

export interface DropdownItemProps extends Omit<IDropdownData, 'value'> {
  minWidth?: string;
  setter: () => void;
  isSelected: boolean;
  customItem?: boolean;
  closeDropdown?: () => void;
}

export interface DropdownProps {
  search?: string;
  bottom?: boolean;
  title: ReactNode;
  minWidth?: string;
  suffix?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  relative?: boolean;
  buttonMode?: boolean;
  emptyMessage?: string;
  customItems?: boolean;
  customTitle?: boolean;
  mode: 'select' | 'menu';
  defaultValue?: ReactNode;
  data: ReadonlyArray<IDropdownData>;
}

export interface DropdownListProps {
  search?: string;
  isOpen: boolean;
  bottom?: boolean;
  minWidth?: string;
  header?: ReactNode;
  footer?: ReactNode;
  emptyMessage?: string;
  customItems?: boolean;
  customTitle?: boolean;
  selectedIndex: number;
  dropdownWrapperId: string;
  toggleDropdown: () => void;
  data: ReadonlyArray<IDropdownData>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
}
