import { supportsMAILMarkets } from '@/constants';
import {
  getInterestMAILViewContract,
  getInterestViewContract,
} from '@/utils/contracts';
import { getStaticWeb3Provider } from '@/utils/web3-provider';

import { GetUserBalances } from './balances.types';

export const getUserBalances: GetUserBalances = (chainId: number, ...rest) => {
  if (supportsMAILMarkets(chainId)) {
    const contract = getInterestMAILViewContract(
      chainId,
      getStaticWeb3Provider(chainId)
    );

    return contract.getUserBalances(...rest);
  }

  const contract = getInterestViewContract(
    chainId,
    getStaticWeb3Provider(chainId)
  );

  return contract.getUserBalances(...rest);
};
