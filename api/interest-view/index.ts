import { ethers } from 'ethers';

import { getInterestViewContract, getStaticWeb3Provider } from '@/utils';

import {
  GetDineroMarketSummary,
  GetUserDineroMarketData,
} from './interest-view.types';

export const getDineroMarketSummary: GetDineroMarketSummary = (
  chainId,
  dineroMarkets
) => {
  const contract = getInterestViewContract(
    chainId,
    getStaticWeb3Provider(chainId)
  );

  return contract.getDineroMarketsSummary(dineroMarkets);
};

export const getUserDineroMarketData: GetUserDineroMarketData = (
  chainId,
  user,
  dineroMarket,
  tokens,
  overrides
) => {
  const contract = getInterestViewContract(
    chainId,
    getStaticWeb3Provider(chainId)
  );

  return contract.getDineroMarketUserData(
    user,
    dineroMarket,
    tokens,
    overrides
  );
};

export const getFarmsSummary = (
  chainId: number,
  pairs: Array<string>,
  poolIds: Array<number>,
  tokens: Array<string>
) => {
  const interestView = getInterestViewContract(
    chainId,
    getStaticWeb3Provider(chainId)
  );

  return interestView.getFarmsSummary(pairs, poolIds, tokens);
};

export const getUserFarmData = (
  chainId: number,
  token: string,
  user: string,
  poolId: number
) => {
  const interestView = getInterestViewContract(
    chainId,
    getStaticWeb3Provider(chainId)
  );

  return interestView.getUserFarmData(token, user, poolId);
};
