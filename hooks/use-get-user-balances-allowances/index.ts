import { DEFAULT_ACCOUNT } from '@/constants';
import { UseContractArgs } from '@/interface';
import InterestViewBalancesABI from '@/sdk/abi/interest-view-balances.abi.json';
import { getInterestViewBalancesAddress } from '@/utils';
import { logTransactionEvent, Pages, Status, Type } from '@/utils/analytics';

import { useSafeContractRead } from '../use-safe-contract-read';
import { useIdAccount } from './../use-id-account/index';

export const useGetUserBalancesAndAllowances = (
  spender: string,
  tokens: Array<string>,
  args = {} as UseContractArgs
) => {
  const { chainId, account } = useIdAccount();

  return useSafeContractRead({
    addressOrName: getInterestViewBalancesAddress(chainId),
    contractInterface: InterestViewBalancesABI,
    functionName: 'getUserBalancesAndAllowances',
    args: [account || DEFAULT_ACCOUNT, spender, tokens],
    onError: () =>
      logTransactionEvent({
        status: Status.Error,
        type: Type.Read,
        pages: Pages.DexPool,
        functionName: 'getUserBalancesAndAllowances',
      }),
    onSuccess: () =>
      logTransactionEvent({
        status: Status.Success,
        type: Type.Read,
        pages: Pages.DexPool,
        functionName: 'getUserBalancesAndAllowances',
      }),
    ...args,
  });
};
