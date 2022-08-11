import { Control, UseFormSetValue } from 'react-hook-form';

import { IEarnForm } from '../../earn.types';

export interface TypeFilterProps {
  control: Control<IEarnForm>;
  setValue: UseFormSetValue<IEarnForm>;
}

export interface OnlyStakedFilterProps {
  control: Control<IEarnForm>;
  setValue: UseFormSetValue<IEarnForm>;
}

export interface OnlyFinishedFilterProps {
  control: Control<IEarnForm>;
  setValue: UseFormSetValue<IEarnForm>;
}
export interface SortFilterProps {
  control: Control<IEarnForm>;
  setValue: UseFormSetValue<IEarnForm>;
}
