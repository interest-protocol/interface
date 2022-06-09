import { getUserFarmData } from '@/api';
import { useIdAccount } from '@/hooks/use-id-account';

import { useCallContract } from '../use-call-contract';
import { DEFAULT_ACCOUNT } from './../../constants/index';

export const useGetUserFarmData = (lpToken: string, poolId: number) => {
  const { chainId, account } = useIdAccount();

  return useCallContract(chainId, getUserFarmData, [
    chainId,
    lpToken,
    account || DEFAULT_ACCOUNT,
    poolId,
    {},
  ]);
};
