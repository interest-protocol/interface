import { getUserBalances } from '@/api';
import { DEFAULT_ACCOUNT } from '@/constants';

import { useCallContract } from '../use-call-contract';
import { useIdAccount } from './../use-id-account/index';

export const useGetUserBalances = (tokens: ReadonlyArray<string>) => {
  const { chainId, account } = useIdAccount();

  return useCallContract(chainId, getUserBalances, [
    chainId,
    account || DEFAULT_ACCOUNT,
    tokens,
    {},
  ]);
};
