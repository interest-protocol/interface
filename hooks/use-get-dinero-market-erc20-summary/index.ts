import { prop } from 'ramda';
import { useSelector } from 'react-redux';

import { getDineroMarketSummary } from '@/api';
import { supportsDineroMarkets } from '@/constants';
import { DINERO_MARKET_CONTRACTS } from '@/sdk/constants';
import { getChainId } from '@/state/core/core.selectors';

import { useCallContract } from '../use-call-contract';

export const useGetDineroMarketErc20Summary = () => {
  const chainId = useSelector(getChainId) as number | null;
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
