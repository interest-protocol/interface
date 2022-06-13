import { prop } from 'ramda';

import { getDineroMarketSummary } from '@/api';
import { supportsDineroMarkets } from '@/constants';
import { DINERO_MARKET_CONTRACTS } from '@/sdk/constants';

import { useCallContract } from '../use-call-contract';
import { useIdAccount } from '../use-id-account';

export const useGetDineroMarketErc20Summary = () => {
  const { chainId } = useIdAccount();

  const addressArray =
    chainId && supportsDineroMarkets(chainId)
      ? DINERO_MARKET_CONTRACTS[chainId].map(prop('marketAddress'))
      : [''];

  return useCallContract(chainId, getDineroMarketSummary, [
    chainId,
    addressArray,
    {},
  ]);
};
