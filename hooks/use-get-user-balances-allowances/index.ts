import { SWRConfiguration } from 'swr';

import { getUserBalancesAndAllowances } from '@/api';
import { DEFAULT_ACCOUNT } from '@/constants';

import { useCallContract } from '../use-call-contract';
import { useIdAccount } from './../use-id-account/index';

export const useGetUserBalancesAndAllowances = (
  spender: string,
  tokens: Array<string>,
  nextConfig: SWRConfiguration = {}
) => {
  const { chainId, account } = useIdAccount();

  return useCallContract(
    chainId,
    getUserBalancesAndAllowances,
    [chainId, account || DEFAULT_ACCOUNT, spender, tokens, {}],
    nextConfig
  );
};
