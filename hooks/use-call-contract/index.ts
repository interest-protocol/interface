import { isNil } from 'ramda';
import useSWR from 'swr';

import { isChainIdSupported } from '@/constants';
import { makeSWRKey } from '@/utils';

export function useCallContract<T>(
  chainId: number | null,
  fn: (...args: any) => Promise<T>,
  args: ReadonlyArray<any>
) {
  return useSWR(makeSWRKey(args, fn.name), async () => {
    if (isNil(chainId) || !isChainIdSupported(chainId))
      return Promise.reject('Unsupported chainId');

    return fn(...args);
  });
}
