import { Control, UseFormSetValue } from 'react-hook-form';

export interface EarnPageProps {
  type: string;
}

export interface EarnFiltersProps {
  setValue: UseFormSetValue<IEarnForm>;
  control: Control<IEarnForm>;
}

export interface IEarnForm {
  typeFarm: string;
}
