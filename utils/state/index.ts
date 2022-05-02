import { cond, equals, F, ifElse, T } from 'ramda';

import { LoadingState } from '@/constants';

export const isLoading = cond([
  [equals(LoadingState.Updating), T],
  [equals(LoadingState.Fetching), T],
  [equals(LoadingState.Updating), T],
  [T, F],
]);

export const isSubmitting = ifElse(equals(LoadingState.Submitting), T, F);
