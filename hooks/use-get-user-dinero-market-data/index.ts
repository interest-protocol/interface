import { useSelector } from 'react-redux';

import { getUserDineroMarketData } from '@/api';
import { getAccount, getChainId } from '@/state/core/core.selectors';

import { useCallContract } from '../use-call-contract';

export const useGetUserDineroMarketData = (
  market: string,
  tokens: Array<string>
) => {
  const chainId = useSelector(getChainId) as number | null;
  const account = useSelector(getAccount) as string;

  return useCallContract(chainId, getUserDineroMarketData, [
    chainId,
    account,
    market,
    tokens,
    {},
  ]);
};
