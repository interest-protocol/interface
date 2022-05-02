import { concat, isNil, prop, reduce } from 'ramda';
import { useSelector } from 'react-redux';
import useSWR from 'swr';

import { getDineroMarketSummary } from '@/api/dinero-market';
import { isChainIdSupported } from '@/constants/chains';
import { NO_SWR_DATA } from '@/constants/index';
import { DINERO_MARKET_CONTRACTS } from '@/sdk/constants';
import { getChainId } from '@/state/core/core.selectors';

const createKey = reduce(concat, '');

export const useGetDineroMarketErc20Summary = () => {
  const chainId = useSelector(getChainId) as number | null;
  const addressArray = chainId
    ? DINERO_MARKET_CONTRACTS[chainId]
        .map(prop('address'))
        .concat([chainId.toString()])
    : [''];

  const { data, ...rest } = useSWR(createKey(addressArray), async () => {
    if (isNil(chainId) || !isChainIdSupported(chainId)) return NO_SWR_DATA;

    return getDineroMarketSummary(
      chainId,
      DINERO_MARKET_CONTRACTS[chainId].map(prop('address')),
      {}
    );
  });

  return {
    data: data === NO_SWR_DATA ? undefined : data,
    ...rest,
  };
};
