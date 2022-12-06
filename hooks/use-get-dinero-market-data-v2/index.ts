import { pathOr } from 'ramda';

import { DEFAULT_ACCOUNT } from '@/constants';
import { DINERO_MARKET_DATA_CALL_MAP } from '@/constants/dinero-markets';
import InterestViewDineroV2ABI from '@/sdk/abi/interest-view-dinero-v2.abi.json';
import { getInterestViewDineroV2Address } from '@/utils';
import {
  GAPage,
  GAStatus,
  GAType,
  logTransactionEvent,
} from '@/utils/analytics';

import { useSafeContractRead } from '../use-safe-contract-read';
import { useIdAccount } from './../use-id-account';

export const useGetDineroMarketDataV2 = (market: string) => {
  const { account, chainId } = useIdAccount();

  const data = pathOr(
    { kind: '', baseToken: '' },
    [chainId.toString(), market],
    DINERO_MARKET_DATA_CALL_MAP
  );

  return useSafeContractRead({
    addressOrName: getInterestViewDineroV2Address(chainId),
    contractInterface: InterestViewDineroV2ABI,
    functionName: 'getDineroMarketData',
    args: [account || DEFAULT_ACCOUNT, market, data.baseToken, data.kind],
    onError: () =>
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Read,
        page: GAPage.DineroMarketPanel,
        functionName: 'getDineroMarketData',
      }),
    onSuccess: () =>
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Read,
        page: GAPage.DineroMarketPanel,
        functionName: 'getDineroMarketData',
      }),
  });
};
