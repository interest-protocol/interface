import { useSelector } from 'react-redux';

import { getUserBalances } from '@/api';
import { getAccount, getChainId } from '@/state/core/core.selectors';

import { useCallContract } from '../use-call-contract';

export const useGetUserBalances = (tokens: ReadonlyArray<string>) => {
  const chainId = useSelector(getChainId) as number | null;
  const account = useSelector(getAccount) as string;

  return useCallContract(chainId, getUserBalances, [
    chainId,
    account,
    tokens,
    {},
  ]);
};
