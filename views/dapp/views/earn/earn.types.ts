import { Dispatch, SetStateAction } from 'react';
import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';

export interface EarnPageProps {
  type: string;
}

export interface EarnFiltersProps extends EarnFilterManagerProps {
  register: UseFormRegister<IEarnForm>;
}

export interface EarnFilterManagerProps {
  control: Control<IEarnForm>;
  setValue: UseFormSetValue<IEarnForm>;
  isFilterSearch: boolean;
  setIsFilterSearch: Dispatch<SetStateAction<boolean>>;
}

export interface IEarnForm {
  search: string;
  sortBy: string;
  isStaked: boolean;
  isLive: boolean;
}
