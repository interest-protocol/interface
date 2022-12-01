import { useMemo } from 'react';

import { DEFAULT_ACCOUNT } from '@/constants';
import { UseContractArgs } from '@/interface';
import InterestViewBalancesABI from '@/sdk/abi/interest-view-balances.abi.json';
import { getInterestViewBalancesAddress } from '@/utils';
import { logTransactionEvent, Pages, Status, Type } from '@/utils/analytics';

import { useSafeContractRead } from '../use-safe-contract-read';
import { useIdAccount } from './../use-id-account';

export const useGetUserBalances = (
  tokens: ReadonlyArray<string>,
  extraArgs: UseContractArgs = {}
) => {
  const { chainId, account } = useIdAccount();
  const user = account || DEFAULT_ACCOUNT;
  const args = useMemo(() => [user, tokens], [user, tokens]);

  return useSafeContractRead({
    addressOrName: getInterestViewBalancesAddress(chainId),
    contractInterface: InterestViewBalancesABI,
    functionName: 'getUserBalances',
    args: args,
    enabled: !!tokens.length,
    onError: () =>
      logTransactionEvent({
        status: Status.Error,
        type: Type.Read,
        pages: Pages.Faucet,
        functionName: 'getUserBalances',
      }),
    onSuccess: () =>
      logTransactionEvent({
        status: Status.Success,
        type: Type.Read,
        pages: Pages.Faucet,
        functionName: 'getUserBalances',
      }),
    ...extraArgs,
  });
};
