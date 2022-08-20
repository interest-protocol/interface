import { ethers } from 'ethers';
import { path } from 'ramda';

import { getUserFarmData } from '@/api';
import {
  BASE_TOKENS_FARM_MAP,
  DEFAULT_ACCOUNT,
  TOKEN_FARM_ID_MAP,
} from '@/constants';

import { useCallContract } from '../use-call-contract';
import { useIdAccount } from '../use-id-account';

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

  return useCallContract(chainId, getUserFarmData, [
    chainId,
    pairAddress,
    account || DEFAULT_ACCOUNT,
    poolId,
    baseTokens,
    {},
  ]);
};
