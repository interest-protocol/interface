import { getDineroMarketsSummaryV2 } from '@/api/interest-view-dinero-v2';
import { DEFAULT_ACCOUNT } from '@/constants';
import { DINERO_MARKET_SUMMARY_CALL_MAP } from '@/constants/dinero-markets';

import { useCallContract } from '../use-call-contract';
import { useIdAccount } from './../use-id-account/index';

export const useGetDineroMarketsSummaryV2 = () => {
  const { chainId, account } = useIdAccount();

  const callMap = DINERO_MARKET_SUMMARY_CALL_MAP[chainId] || {};

  return useCallContract(chainId, getDineroMarketsSummaryV2, [
    chainId,
    account || DEFAULT_ACCOUNT,
    callMap.nativeMarket,
    callMap.erc20Markets,
    callMap.lpFreeMarkets,
  ]);
};
