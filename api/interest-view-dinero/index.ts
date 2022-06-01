import { getInterestViewDineroContract, getStaticWeb3Provider } from '@/utils';

import {
  GetDineroMarketSummary,
  GetUserDineroMarketData,
} from './interest-view-dinero.types';

export const getDineroMarketSummary: GetDineroMarketSummary = (
  chainId,
  dineroMarkets
) => {
  const contract = getInterestViewDineroContract(
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
  const contract = getInterestViewDineroContract(
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
  const interestView = getInterestViewDineroContract(
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
  const interestView = getInterestViewDineroContract(
    chainId,
    getStaticWeb3Provider(chainId)
  );

  return interestView.getUserFarmData(token, user, poolId);
};
