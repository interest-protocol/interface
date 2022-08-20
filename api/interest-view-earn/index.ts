import { getInterestViewEarnContract, getStaticWeb3Provider } from '@/utils';

export const getFarmsSummary = (
  chainId: number,
  account: string,
  pairs: Array<string>,
  poolIds: Array<number>,
  tokens: Array<string>
) =>
  getInterestViewEarnContract(
    chainId,
    getStaticWeb3Provider(chainId)
  ).getFarmsSummary(account, pairs, poolIds, tokens);

export const getUserFarmData = (
  chainId: number,
  token: string,
  user: string,
  poolId: number,
  tokens: Array<string>
) =>
  getInterestViewEarnContract(
    chainId,
    getStaticWeb3Provider(chainId)
  ).getUserFarmData(token, user, poolId, tokens);
