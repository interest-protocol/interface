import { getInterestViewBalancesContract } from '@/utils/contracts';
import { getStaticWeb3Provider } from '@/utils/web3-provider';

import { GetUserBalances } from './interest-view-balances.types';

export const getUserBalances: GetUserBalances = (chainId: number, ...rest) => {
  const contract = getInterestViewBalancesContract(
    chainId,
    getStaticWeb3Provider(chainId)
  );

  return contract.getUserBalances(...rest);
};
