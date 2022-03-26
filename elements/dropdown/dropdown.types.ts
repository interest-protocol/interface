import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface IDropdownData {
  value: string;
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
  isOpen?: boolean;
  minWidth?: string;
  suffix?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  buttonMode?: boolean;
  customItems?: boolean;
  customTitle?: boolean;
  mode: 'select' | 'menu';
  defaultValue?: ReactNode;
  data: ReadonlyArray<IDropdownData>;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}
