import { getInterestViewEarnContract, getStaticWeb3Provider } from '@/utils';

export const getFarmsSummary = (
  chainId: number,
  pairs: Array<string>,
  poolIds: Array<number>,
  tokens: Array<string>,
  user: string
) =>
  getInterestViewEarnContract(
    chainId,
    getStaticWeb3Provider(chainId)
  ).getFarmsSummary(pairs, poolIds, tokens, user);
