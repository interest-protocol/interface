import { propOr } from 'ramda';
import toast from 'react-hot-toast';

import { tryCatch } from '@/utils/promise';

import { ToastMsgs, ToastOpts } from './toast.types';

export function showToast<T>(
  fn: Promise<T>,
  msgs: ToastMsgs = {
    loading: 'Submitting tx...',
    success: 'Success!',
    error: propOr('Something went wrong', 'message'),
  },
  options: ToastOpts = undefined
): Promise<T | undefined> {
  return tryCatch(toast.promise(fn, msgs, options), (x) => x);
}
