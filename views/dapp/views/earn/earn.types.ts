import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

export interface EarnPageProps {
  type: string;
}

export interface EarnFiltersProps {
  register: UseFormRegister<IEarnForm>;
  setValue: UseFormSetValue<IEarnForm>;
  isStaked: boolean;
  isLive: boolean;
  sortBy: string;
}

export interface IEarnForm {
  search: string;
  sortBy: string;
  isStaked: boolean;
  isLive: boolean;
}
