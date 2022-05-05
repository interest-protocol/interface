import { LoadingState } from '@/constants';

export const isLoading = (x: LoadingState) =>
  x === LoadingState.Updating || LoadingState.Fetching;

export const isSubmitting = (x: LoadingState) => x === LoadingState.Submitting;
