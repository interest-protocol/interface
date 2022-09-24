import { DEFAULT_ACCOUNT } from '@/constants';
import { UseContractArgs } from '@/interface';
import InterestViewBalancesABI from '@/sdk/abi/interest-view-balances.abi.json';
import { getInterestViewBalancesAddress } from '@/utils';

import { useContractRead } from '../use-contract-read';
import { useIdAccount } from './../use-id-account/index';

export const useGetUserBalancesAndAllowances = (
  spender: string,
  tokens: Array<string>,
  args = {} as UseContractArgs
) => {
  const { chainId, account } = useIdAccount();

  return useContractRead({
    addressOrName: getInterestViewBalancesAddress(chainId),
    contractInterface: InterestViewBalancesABI,
    functionName: 'getUserBalancesAndAllowances',
    args: [account || DEFAULT_ACCOUNT, spender, tokens],
    ...args,
  });
};
