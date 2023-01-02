import { SendTransactionResult } from '@wagmi/core';
import { propOr } from 'ramda';
import toast from 'react-hot-toast';

import { logGenericEvent } from '@/utils/analytics';
import { tryCatch } from '@/utils/promise';

import { ToastMsgs, ToastOpts } from './toast.types';

export const showTXSuccessToast = async (
  tx: SendTransactionResult | undefined
): Promise<void> => {
  if (!tx) return;
  const receipt = await tx.wait(2);

  toast(
    <a
      target="__black"
      rel="noreferrer nofollow"
      href={`/tx/${receipt.transactionHash}`}
    >
      Check Explorer
    </a>
  );
};

export function showToast<T>(
  fn: Promise<T>,
  msgs: ToastMsgs = {
    loading: 'Submitting tx...',
    success: 'Success!',
    error: propOr('Something went wrong', 'message'),
  },
  options: ToastOpts = undefined
): Promise<T | undefined> {
  return tryCatch(toast.promise(fn, msgs, options), (x) =>
    logGenericEvent('E_ShowToast' + propOr('message', 'error', x))
  );
}
