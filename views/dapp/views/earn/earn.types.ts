import { Dispatch, SetStateAction } from 'react';

export interface EarnPageProps {
  type: string;
}

export interface PaginationButtonProps {
  setStepData: Dispatch<SetStateAction<number>>;
  stepData: number;
  farmsSize: number;
  poolSize: number;
  type: string;
}
