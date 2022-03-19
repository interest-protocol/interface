import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface IDropdownData {
  value: string;
  noAction?: boolean;
  onSelect?: () => void;
  displayTitle?: ReactNode;
  displayOption: ReactNode;
}

export interface DropdownItemProps extends Omit<IDropdownData, 'value'> {
  isSelected: boolean;
  setter: () => void;
}

export interface DropdownProps {
  title: ReactNode;
  isOpen?: boolean;
  suffix?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  buttonMode?: boolean;
  mode: 'select' | 'menu';
  defaultValue?: ReactNode;
  data: ReadonlyArray<IDropdownData>;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}
