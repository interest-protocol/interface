import { getUserBalances } from '@/api';

import { useCallContract } from '../use-call-contract';
import { DEFAULT_ACCOUNT } from './../../constants/index';
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
