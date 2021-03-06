import { LoadingState } from '@/constants';

export const isLoading = (x: LoadingState): boolean =>
  x === LoadingState.Updating || !!LoadingState.Fetching;

export const isSubmitting = (x: LoadingState): boolean =>
  x === LoadingState.Submitting;
