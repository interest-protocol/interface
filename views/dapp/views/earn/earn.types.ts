import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';

export interface EarnPageProps {
  type: string;
}

export interface EarnFiltersProps {
  control: Control<IEarnForm>;
  register: UseFormRegister<IEarnForm>;
  setValue: UseFormSetValue<IEarnForm>;
}

export interface IEarnForm {
  search: string;
  sortBy: string;
  isStaked: boolean;
  isLive: boolean;
}
