import { pathOr } from 'ramda';

import { getDineroMarketDataV2 } from '@/api/interest-view-dinero-v2';
import { DEFAULT_ACCOUNT } from '@/constants';
import { DINERO_MARKET_DATA_CALL_MAP } from '@/constants/dinero-markets';

import { useCallContract } from '../use-call-contract';
import { useIdAccount } from './../use-id-account/index';

export const useGetDineroMarketDataV2 = (market: string) => {
  const { account, chainId } = useIdAccount();

  const data = pathOr(
    { kind: '', baseToken: '' },
    [chainId.toString(), market],
    DINERO_MARKET_DATA_CALL_MAP
  );

  return useCallContract(chainId, getDineroMarketDataV2, [
    chainId,
    account || DEFAULT_ACCOUNT,
    market,
    data.baseToken,
    data.kind,
  ]);
};
