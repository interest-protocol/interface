import { getInterestDexFactoryContract, getStaticWeb3Provider } from '@/utils';

import { IsInterestDexPair } from './interest-dex-factory.types';

export const isInterestDexPair: IsInterestDexPair = (
  chainId: number,
  pairAddress: string
) =>
  getInterestDexFactoryContract(chainId, getStaticWeb3Provider(chainId)).isPair(
    pairAddress
  );
