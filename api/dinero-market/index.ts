import { getInterestViewContract } from '@/utils/contracts';
import { getStaticWeb3Provider } from '@/utils/web3-provider';

import { GetDineroMarketSummary } from './dinero-market.types';

export const getDineroMarketSummary: GetDineroMarketSummary = (
  chainId,
  ...rest
) => {
  const contract = getInterestViewContract(
    chainId,
    getStaticWeb3Provider(chainId)
  );

  return contract.getDineroMarketsSummary(...rest);
};
