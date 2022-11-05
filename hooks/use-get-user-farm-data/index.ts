import { ethers } from 'ethers';
import { path } from 'ramda';

import {
  BASE_TOKENS_FARM_MAP,
  DEFAULT_ACCOUNT,
  TOKEN_FARM_ID_MAP,
} from '@/constants';
import InterestViewEarnABI from '@/sdk/abi/interest-view-earn.abi.json';
import { getInterestViewEarnAddress } from '@/utils';

import { useIdAccount } from '../use-id-account';
import { useSafeContractRead } from '../use-safe-contract-read';

export const useGetUserFarmData = (pairAddress: string) => {
  const { chainId, account } = useIdAccount();

  const poolId = path(
    [chainId.toString(), ethers.utils.getAddress(pairAddress)],
    TOKEN_FARM_ID_MAP
  );

  const baseTokens = path(
    [chainId.toString(), ethers.utils.getAddress(pairAddress)],
    BASE_TOKENS_FARM_MAP
  );

  return useSafeContractRead({
    addressOrName: getInterestViewEarnAddress(chainId),
    contractInterface: InterestViewEarnABI,
    functionName: 'getUserFarmData',
    args: [pairAddress, account || DEFAULT_ACCOUNT, poolId, baseTokens],
  });
};
