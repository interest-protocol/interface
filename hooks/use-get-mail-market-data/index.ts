import { useSelector } from 'react-redux';

import { getMAILMarketData } from '@/api';
import { getAccount, getChainId } from '@/state/core/core.selectors';

import { useCallContract } from '../use-call-contract';

export const useGetMailMarketData = (mailMarketAddress: string) => {
  const chainId = useSelector(getChainId) as null | number;
  const account = useSelector(getAccount) as string;

  return useCallContract(chainId, getMAILMarketData, [
    chainId,
    mailMarketAddress,
    account,
    {},
  ]);
};
