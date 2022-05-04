import { useSelector } from 'react-redux';

import { getUserFarmData } from '@/api';
import { getAccount, getChainId } from '@/state/core/core.selectors';

import { useCallContract } from '../use-call-contract';

export const useGetUserFarmData = (lpToken: string, poolId: number) => {
  const chainId = useSelector(getChainId) as number | null;
  const account = useSelector(getAccount) as string;

  return useCallContract(chainId, getUserFarmData, [
    chainId,
    lpToken,
    account,
    poolId,
    {},
  ]);
};
