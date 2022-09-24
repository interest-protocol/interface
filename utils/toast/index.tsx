import { SendTransactionResult } from '@wagmi/core';
import { propOr } from 'ramda';
import toast from 'react-hot-toast';

import { CHAINS } from '@/constants';
import { tryCatch } from '@/utils/promise';

import { ToastMsgs, ToastOpts } from './toast.types';

export const showTXSuccessToast = async (
  tx: SendTransactionResult | undefined,
  chainId: number
): Promise<void> => {
  if (!tx) return;
  const receipt = await tx.wait(2);

  const explorer = CHAINS[chainId].blockExplorers;

  toast(
    <a
      target="__black"
      rel="noreferrer nofollow"
      href={`${explorer ? explorer.default.url : ''}/tx/${
        receipt.transactionHash
      }`}
    >
      {explorer?.default.name || 'Check Explorer'}
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
  return tryCatch(toast.promise(fn, msgs, options), console.log);
}
