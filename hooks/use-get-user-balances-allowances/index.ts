import {
  getUserBalanceAndAllowance,
  getUserBalancesAndAllowances,
} from '@/api';
import { DEFAULT_ACCOUNT } from '@/constants';

import { useCallContract } from '../use-call-contract';
import { useIdAccount } from './../use-id-account/index';

export const useGetUserBalancesAndAllowances = (
  spender: string,
  tokens: Array<string>
) => {
  const { chainId, account } = useIdAccount();

  return useCallContract(chainId, getUserBalancesAndAllowances, [
    chainId,
    account || DEFAULT_ACCOUNT,
    spender,
    tokens,
    {},
  ]);
};

export const useGetUserBalanceAndAllowance = (
  spender: string,
  token: string
) => {
  const { chainId, account } = useIdAccount();

  return useCallContract(chainId, getUserBalanceAndAllowance, [
    chainId,
    account || DEFAULT_ACCOUNT,
    spender,
    token,
    {},
  ]);
};
