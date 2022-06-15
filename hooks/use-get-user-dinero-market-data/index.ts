import { getUserDineroMarketData } from '@/api';

import { useCallContract } from '../use-call-contract';
import { DEFAULT_ACCOUNT } from './../../constants/index';
import { useIdAccount } from './../use-id-account/index';

export const useGetUserDineroMarketData = (
  market: string,
  tokens: Array<string>
) => {
  const { chainId, account } = useIdAccount();

  return useCallContract(chainId, getUserDineroMarketData, [
    chainId,
    account || DEFAULT_ACCOUNT,
    market,
    tokens,
    {},
  ]);
};
