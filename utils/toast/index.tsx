import { SendTransactionResult } from '@wagmi/core';
import { propOr } from 'ramda';
import toast from 'react-hot-toast';

import { CHAINS, EXPLORER_MAP } from '@/constants';
import Box from '@/elements/box';
import Typography from '@/elements/typography';
import { logGenericEvent } from '@/utils/analytics';
import { tryCatch } from '@/utils/promise';

import { ToastMsgs, ToastOpts } from './toast.types';

export const showTXSuccessToast = async (
  tx: SendTransactionResult | undefined,
  chainId: number
): Promise<void> => {
  if (!tx) return;
  const receipt = await tx.wait(2);

  const explorer = CHAINS[chainId].blockExplorers;

  const SVG = EXPLORER_MAP[chainId];
  toast(
    <a
      target="__black"
      rel="noreferrer nofollow"
      href={`${explorer ? explorer.default.url : ''}/tx/${
        receipt.transactionHash
      }`}
    >
      {explorer ? (
        <Box display="flex" alignItems="center">
          <Box width="1.5rem" height="1.5rem" mr="M">
            <SVG
              width="100%"
              height="100%"
              maxHeight="1.5rem"
              maxWidth="1.5rem"
            />
          </Box>
          <Typography
            variant="normal"
            color="accent"
            textDecoration="underline"
            fontWeight="700"
            cursor="pointer"
          >
            {explorer?.default.name}
          </Typography>
        </Box>
      ) : (
        'Check Explorer'
      )}
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
