import { getInterestViewContract } from '@/utils/contracts';
import { getStaticWeb3Provider } from '@/utils/web3-provider';

import { GetUserBalances } from './balances.types';

export const getUserBalances: GetUserBalances = (chainId: number, ...rest) => {
  const contract = getInterestViewContract(
    chainId,
    getStaticWeb3Provider(chainId)
  );

  return contract.getUserBalances(...rest);
};
